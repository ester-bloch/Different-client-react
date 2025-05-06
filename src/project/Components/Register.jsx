import React, { useState } from "react";
import "./Register.css";
import { MyButton } from "./MyButton";
import { useDispatch } from "react-redux";
import { setAdvertiser, setAdvertiserFromRegister } from "../Data-Redux/advertiserRedux";
import { register } from "../scripts/api";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useParentPath from "../scripts/ParetntPath";
export const RegisterOrUpdate = ({ advertiser, functionToUpdate, textForH1 }) => {
  const dispatch = useDispatch();
  const ParentPath =useParentPath()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    phoneNumber: "",
    phoneNumber2: "",
    apartments: "",
    name: "",
    ...advertiser && { ...advertiser, password2: advertiser.password }
  });
  
  const errorOptions = {
    name: "שם קצר מידי",
    email: "כתובת מייל לא תקינה",
    password: "סיסמא לא תקינה",
    password2: "סיסמא חייבת להיות תואמת",
    phoneNumber: "מספר טלפון חייב להכיל 10 ספרות",
    phoneNumber2: "מספר טלפון חייב להכיל 10 ספרות",
  };
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (formData.password2 != formData.password) setErrors({ ...errors, password2: errorOptions.password2 });
    let phoneNumber2String = "" + formData.phoneNumber2;
    if (formData.phoneNumber2 && !phoneNumber2String.match(/^\d{10}$/)) {
      setErrors({ ...errors, phoneNumber2: errorOptions.phoneNumber2 });
    }
    if (formData.password.length < 6) setErrors({ errors, password: errorOptions.password });
    if (!formData.phoneNumber.match(/^\d{10}$/)) setErrors({ errors, phoneNumber: errorOptions.phoneNumber });
    if (!formData.email.includes("@")) setErrors({ ...errors, email: errorOptions.email });
    if (!formData.name) setErrors({ ...errors, name: "יש להכניס שם" });
    return Object.values(errors).every((value) => value === null || value === "" || value === undefined) && formData.email != "" && formData.email != undefined;
  };

  const handleChange = (e, validate) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(value);
  };

  const validateName = (value) => {
    if (value.length < 2) {
      setErrors({ ...errors, name: errorOptions.name });
    } else {
      setErrors({ ...errors, name: "" });
    }
  };

  const validateEmail = (value) => {
    // /regex/i.test(value)
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setErrors({ ...errors, email: errorOptions.email });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validatePassword = (value) => {
    const regex = /^[A-Za-z]+\w{7,14}$/;
    // value.match(/regex/)
    if (!value.match(regex)) {
      setErrors({ ...errors, password: errorOptions.password });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };
  const validatePassword2 = (value) => {
    if (value != formData.password) {
      setErrors({ ...errors, password2: errorOptions.password2 });
    } else {
      setErrors({ ...errors, password2: "" });
    }
  };
  const validatePhone = (value) => {
    if (!value.match(/^\d{10}$/)) setErrors({ ...errors, phoneNumber: errorOptions.phoneNumber });
    else setErrors({ ...errors, phoneNumber: "" });
  };
  const validatePhone2 = (value) => {
    if (!value.match(/^\d{10}$/)) setErrors({ ...errors, phoneNumber2: errorOptions.phoneNumber2 });
    else setErrors({ ...errors, phoneNumber2: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (functionToUpdate != undefined) {
        functionToUpdate(formData)
          .then((ans) => {
            dispatch(setAdvertiser(ans.data.advertiser)) 
            Swal.fire({
              title: "! פרטיך עודכנו",
              text: "!עודכן בהצלחה",
              icon: "success",
              confirmButtonText: "תודה",
            });
            navigate(ParentPath)
          })
          .catch((err) => {
            console.error("Error in functionToUpdate:", err);
            Swal.fire({
              title: "!שגיאה",
              text: err,
              icon: "error",
              confirmButtonText: "בסדר",
            });
            navigate(ParentPath)
          });
      } else {
        functionToUpdate == undefined &&
          register(formData)
            .then(() => {
              Swal.fire({
                title: "!ברוך הבא",
                text: r,
                icon: "success",
                confirmButtonText: "בסדר",
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "!שגיאה",
                text: err,
                icon: "error",
                confirmButtonText: "בסדר",
              });
            });

      }
      let r = " כעת לחץ על כניסת מפרסם והיכנס!diferrent נרשמת בהצלחה ל ";

      dispatch(setAdvertiserFromRegister(formData));
      navigate("./");
    }
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}>
        <h2>{textForH1 ? textForH1 : "הרשמת מפרסם"} </h2>

        <div>
          <label htmlFor="name">שם:</label>
          <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, validateName)} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">כתובת מייל:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(e, validateEmail)} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="Password">סיסמא:</label>
          <input type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, validatePassword)} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="Password2">אימות סיסמא:</label>
          <input type="password" name="password2" value={formData.password2} onChange={(e) => handleChange(e, validatePassword2)} />
          {errors.password2 && <p style={{ color: "red" }}>{errors.password2}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">מספר טלפון:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleChange(e, validatePhone)} />
          {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber2">מספר טלפון נוסף:</label>
          <input type="text" name="phoneNumber2" value={formData.phoneNumber2} onChange={(e) => handleChange(e, validatePhone2)} />
          {errors.phoneNumber2 && <p style={{ color: "red" }}>{errors.phoneNumber2}</p>}
        </div>

        {<MyButton myType="submit" iconName={"fa-solid fa-check"} textToShow={"אישור"}></MyButton>}
      </form>
    </>
  );
};
