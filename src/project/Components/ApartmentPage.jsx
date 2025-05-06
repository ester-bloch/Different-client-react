import React, { useEffect, useState } from "react";
import { getAdvertiserDetails, getWeather } from "../scripts/api";
import { translate } from "@vitalets/google-translate-api";
import "./ApartmentPage.css";
// import './Blog.css';

export const ApartmentPage = ({ apartment }) => {
  const [weather, setWeather] = useState({});
  const [advertiserDetails, setAdvertiserDetails] = useState({});

  useEffect(() => {
    if (apartment.city) {
      getWeather(apartment.city.name)
        .then((data) => {
          setWeather(data.data);
        })
        .catch((err) => {});
    }
    if (apartment.advertiser) {
      getAdvertiserDetails(apartment.advertiser._id)
        .then((data) => {
          setAdvertiserDetails(data.data);
        })
        .catch((err) => {});
    }
  }, [apartment]);

  return (
    <>
      {apartment && (
        <div className="apartment-card">
          {apartment.city && apartment.city.name && (
            <p>
              <strong>עיר:</strong> {apartment.city.name}
            </p>
          )}

          {weather.temperature && (
            <p>
              {weather.temperature} °C <strong>:טמפרטורה</strong>
            </p>
          )}
          {weather.descriptionHebrew && (
            <>
              <span>תיאור טמפרטורה</span>:
              <strong>{" "}{weather.descriptionHebrew}{" "}</strong>
            </>
          )}

          {(apartment.picture && <img src={`${process.env.PUBLIC_URL}/images/aparts/${apartment.picture}`} alt={apartment.name} />) || (
            <img src={`${process.env.PUBLIC_URL}/images/aparts/1.jpg`} alt={apartment.name} />
          )}
          {apartment.name && <h2>{apartment.name}</h2>}
          {apartment.category && (
            <p>
              <strong>קטגוריה:</strong> {apartment.category.name}
            </p>
          )}
          {apartment.address && (
            <p>
              <strong>כתובת:</strong> {apartment.address}
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
          {apartment.price && (
            <p>
              <strong>מחיר:</strong> {apartment.price} ש"ח
            </p>
          )}
          {apartment.more && apartment.more.length > 0 && (
            <>
              <p>
                <strong>מפרט נוסף:</strong>
              </p>
              <ul className="ul">
                {apartment.more.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {advertiserDetails.email && (
            <p>
              {advertiserDetails.email} <strong>:מפרסם</strong>
            </p>
          )}
          {advertiserDetails.name && (
            <p>
              {advertiserDetails.name} <strong>:שם המפרסם</strong>
            </p>
          )}
          {(advertiserDetails.phoneNumber && (
            <p>
              {advertiserDetails.phoneNumber} <strong>:טלפון</strong>
            </p>
          )) || <p>אין מפרסם</p>}
        </div>
      )}
    </>
  );
};
