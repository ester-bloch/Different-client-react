import { useDispatch, useSelector } from "react-redux";
import "./Personal-Area.css";
import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { Outlet, useLocation, useNavigate } from "react-router";
import { setApartment, setApartmentOfThisAdvertiser } from "../Data-Redux/advertiserRedux";
import { getApartsByAdvertiser } from "../scripts/api";

export const PersonalErea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [thisAdvertiser, setThisAdvertiser] = useState({});
  const { email, phoneNumber2, phoneNumber, name, _id } = thisAdvertiser;
  const [apartments, setApartments] = useState([]);
  const [changed, setChanged] = useState(0);
  const [textToShowOpen, setTextToShowOpen] = useState("עריכה");
  
  useEffect(() => {
    setThisAdvertiser(JSON.parse(localStorage.getItem("different_this_advertiser")));
    const { _id } = JSON.parse(localStorage.getItem("different_this_advertiser"));
    if (_id) {
      getApartsByAdvertiser(_id)
        .then((ans) => {
          let aparts = ans.data;
          setApartments(aparts);
          dispatch(setApartmentOfThisAdvertiser(aparts));
        })
        .catch((err) => console.log(err));
    }
  }, [changed]);

  if (!thisAdvertiser) {
    return <div>טוען...</div>;
  }
  
  const handleEdit = () => {
    navigate("editDetails");
  };

  const addApart = () => {
    setChanged(changed + 1);
    navigate("addApart");
  };

  const updateApart = (apartment) => {
    dispatch(setApartment(apartment));
    setChanged(changed + 1);
    navigate("updateApart");
  };

  return (
    <>
      <div className="datails">
        <h1>איזור אישי</h1>
        <h2>פרטים אישיים:</h2>
        {name && <p>שם: {name}</p>}
        {email && <p>דוא"ל: {email}</p>}
        {phoneNumber2 && phoneNumber2.length > 0 && <p>מספר טלפון 2: {phoneNumber2}</p>}
        {phoneNumber && <p>מספר טלפון: {phoneNumber}</p>}
        <MyButton iconName={"fa-regular fa-edit"} myOnClick={handleEdit} textToShow={textToShowOpen}></MyButton>
        <Outlet></Outlet>
        <h2>דירות:</h2>
        {apartments && apartments.length > 0 ? (
          <ul>
            {apartments.map((apartment) => (
              <li key={apartment._id}>
                {apartment.name}
                <MyButton iconName={"fa-regular fa-folder-open"} textToShow={"צפייה בפרטים ועדכון"} myOnClick={() => updateApart(apartment)}></MyButton>
              </li>
            ))}
          </ul>
        ) : (
          <p>אין דירות זמינות.</p>
        )}
      </div>
      <MyButton iconName={"fa-solid fa-plus"} textToShow={"הוספת דירה"} myOnClick={() => addApart()}></MyButton>
    </>
  );
};
