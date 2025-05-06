import React from "react";
import { MyButton } from "./MyButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setThisApart = (apartment) => {
    dispatch({ type: "SET_APARTMENT", payload: apartment });
    navigate("showApart");
  };
  return (
    <>
      {apartment && (
        <div className="apartment-card">
          {(apartment.picture && <img src={`${process.env.PUBLIC_URL}/images/aparts/${apartment.picture}`} alt={apartment.name} />) || (
            <img src={`${process.env.PUBLIC_URL}/images/aparts/1.jpg`} alt={apartment.name} />
          )}

          {apartment.category && (
            <p>
              <strong>קטגוריה:</strong> {apartment.category.name}
            </p>
          )}
          {apartment.name && <h2>{apartment.name}</h2>}
          {apartment.address && (
            <p>
              <strong>כתובת:</strong> {apartment.address}
            </p>
          )}
          {apartment.city && apartment.city.name && (
            <p>
              <strong>עיר:</strong> {apartment.city.name}
            </p>
          )}
          {apartment.description && (
            <p>
              <strong>תיאור:</strong> {apartment.description}
            </p>
          )}
          {apartment.numbeds && (
            <p>
              <strong>מספר חדרים:</strong> {apartment.numbeds}
            </p>
          )}
          <MyButton
            myOnClick={() => {
              setThisApart(apartment);
            }}
            textToShow={"לפרטים נוספים"}
            iconName={"fa-solid fa-arrow-right"}
            backgroundColor={"#287edb"}
          />
        </div>
      )}
    </>
  );
};

export default ApartmentCard;
