import React, { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import Swal from "sweetalert2";
import { getAllCategories, getAllCites, getApartsByAdvertiser } from "../scripts/api";
import useParentPath from "../scripts/ParetntPath";
import { useNavigate } from "react-router";
import { setApartmentOfThisAdvertiser } from "../Data-Redux/advertiserRedux";

export const CreaterOrUpdateApartment = ({ apartment, functionToUpdate, textForH1 }) => {
  const dispatch = useDispatch();
  const ParentPath = useParentPath();
  const user = useSelector((state) => state.advertise.thisAdvertiser);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: { _id: "", name: "" },
    city: { _id: "", name: "" },
    picture: "1.jpg",
    more: [],
    price: "", // הוספת שדה price
    ...(apartment && { ...apartment }),
  });

  const errorOptions = {
    name: "שם קצר מידי",
    description: "יש להכניס תיאור",
    category: "יש לבחור קטגוריה",
    city: "יש לבחור עיר",
    price: "יש להכניס מחיר", // הודעת שגיאה עבור price
  };

  const [cites, setCites] = useState();
  const [categoris, setCategoris] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citesResponse = await getAllCites();
        const categoriesResponse = await getAllCategories();

        const fetchedCites = [...citesResponse.data];
        const fetchedCategoris = [...categoriesResponse.data];

        setCites(fetchedCites);
        setCategoris(fetchedCategoris);
      } catch (err) {
        // טיפול בשגיאות
      }
    };

    fetchData();
  }, []);

  const validateName = (value) => {
    if (value.length < 2) {
      setErrors((prev) => ({ ...prev, name: errorOptions.name }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
      return true;
    }
  };

  const validateDescription = (value) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, description: errorOptions.description }));
    } else {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const validateCategory = (value) => {
    if (!value._id) {
      setErrors((prev) => ({ ...prev, category: errorOptions.category }));
    } else {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const validateCity = (value) => {
    if (!value._id) {
      setErrors((prev) => ({ ...prev, city: errorOptions.city }));
    } else {
      setErrors((prev) => ({ ...prev, city: "" }));
    }
  };

  const validatePrice = (value) => {
    // פונקציית בדיקה עבור price
    if (!value || isNaN(value) || Number(value) <= 0) {
      setErrors((prev) => ({ ...prev, price: errorOptions.price }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, price: "" }));
      return true;
    }
  };

  const validate = () => {
    validatePrice(formData.price);
    validateName(formData.name);
    console.log(errors);
    let ok = Object.values(errors).every((value) => value === "");
    console.log(ok);
    return ok;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "description":
        validateDescription(value);
        break;
      case "category":
        validateCategory({ _id: value, name: value }); // Assuming category is a string for simplicity
        break;
      case "city":
        validateCity({ _id: value, name: value }); // Assuming city is a string for simplicity
        break;
      case "price": // בדיקת תקינות עבור price
        validatePrice(value);
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categoris.find((category) => category._id === e.target.value);
    setFormData({ ...formData, category: selectedCategory });
  };

  const handleCityChange = (e) => {
    const selectedCity = cites.find((city) => city._id === e.target.value);
    setFormData({ ...formData, city: selectedCity });
  };

  const handleMoreChange = (index, value) => {
    const newMore = [...formData.more];
    newMore[index] = value;
    setFormData({ ...formData, more: newMore });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // קבלת הקובץ הראשון בלבד
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveImageToServer(reader.result); // פונקציה לשמירת התמונה

        // שמירת שם התמונה ב-FormData
        setFormData((prevState) => ({
          ...prevState,
          picture: file.name, // שמירת שם הקובץ
        }));
      };
      reader.readAsDataURL(file); // המרת התמונה ל-Base64
    }
  };

  const saveImageToServer = (imageData) => {
    // כאן תוכל להוסיף את הקוד שלך לשמירת התמונה
  };

  const addMoreField = () => {
    setFormData({ ...formData, more: [...formData.more, ""] });
  };

  const removeMoreField = (index) => {
    const newMore = formData.more.filter((_, i) => i !== index);
    setFormData({ ...formData, more: newMore });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (functionToUpdate) {
        let transformedData = {
          advertiser: user._id,
          category: formData.category._id,
          city: formData.city._id,
          description: formData.description,
          more: formData.more.map((item) => item), // כאן אתה יוצר עותק של המערך
          name: formData.name,
          picture: formData.picture,
          price: formData.price, // הוספת price ל-transformedData
        };

        let __id = apartment ? apartment._id : "";
        functionToUpdate(transformedData, __id)
          .then((ans) => {
            getApartsByAdvertiser(user._id).then((ans) => {
             console.log(ans.data);
              // dispatch(setApartmentOfThisAdvertiser(aparts));
            }).catch((err) => console.log(err));
            // Swal.fire({
            //   title: "! פרטי הדירה עודכנו",
            //   text: "!עודכן בהצלחה",
            //   icon: "success",
            //   confirmButtonText: "תודה",
            // });
            navigate(ParentPath);
          })
          .catch((err) => {
            Swal.fire({
              title: err,
              text: err.message,
              icon: "error",
              confirmButtonText: "בסדר",
            });
            // navigate(ParentPath);
          });
      } else {
        // registerApartment(formData)
        //   .then(() => {
        //     Swal.fire({
        //       title: "!דירה נוספה",
        //       text: "הדירה נוספה בהצלחה",
        //       icon: "success",
        //       confirmButtonText: "בסדר",
        //     });
        //   })
        //   .catch((err) => {
        //     Swal.fire({
        //       title: "!שגיאה",
        //       text: err,
        //       icon: "error",
        //       confirmButtonText: "בסדר",
        //     });
        //   });
        // dispatch(setApartmentFromRegister(formData));
      }
    } else {
      alert("יש למלא את כל השדות הנדרשים");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{textForH1 ? textForH1 : "הוספת דירה"} </h2>

      <div>
        <label htmlFor="name">שם הדירה:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="description">תיאור:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="price">מחיר:</label> {/* הוספת שדה מחיר */}
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>} {/* הצגת שגיאה אם יש */}
      </div>

      <div>
        <label htmlFor="city">עיר:</label>
        <select name="city" onChange={handleCityChange} value={formData.city._id}>
          <option disabled value="">
            בחר עיר
          </option>
          {cites &&
            cites.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
        </select>
        {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
      </div>
      <div>
        <label htmlFor="category">קטגוריה:</label>
        <select name="category" onChange={handleCategoryChange} value={formData.category._id}>
          <option disabled value="">
            בחר קטגוריה
          </option>
          {categoris &&
            categoris.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
      </div>
      <div>
        <label>מידע נוסף:</label>
        {formData.more &&
          formData.more.map((moreItem, index) => (
            <div key={index} className="more-item">
              <input type="text" value={moreItem} onChange={(e) => handleMoreChange(index, e.target.value)} />
              <button type="button" onClick={() => removeMoreField(index)}>
                מחק
              </button>
            </div>
          ))}
        <MyButton myType="button" myOnClick={addMoreField} textToShow={"הוסף תוסף"}></MyButton>
      </div>
      {formData.picture && (
        <div>
          <label htmlFor="picture">שם התמונה:</label>
          <input type="text" name="picture" value={formData.picture} onChange={handleChange} />
          {errors.picture && <p style={{ color: "red" }}>{errors.picture}</p>}
        </div>
      )}
      <div>
        <input type="file" id="file-upload" accept="image/*" onChange={handleImageChange} className="file-input" />
        <label htmlFor="file-upload" className="custom-file-upload">
          בחר תמונה
        </label>
      </div>

      <MyButton myType="submit" iconName={"fa-solid fa-check"} textToShow={"אישור"} />
    </form>
  );
};
