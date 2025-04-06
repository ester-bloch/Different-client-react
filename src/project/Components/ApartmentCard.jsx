import React from "react";
// import "./ApartmentCard.css"; // נניח שיש לך קובץ CSS נפרד

const ApartmentCard = ({ apartment }) => {
  return (
    <>
      {apartment && (
        <div className="apartment-card">
          {apartment.picture && (
            <img
              src={`${process.env.PUBLIC_URL}/images/aparts/${apartment.picture}`}
              alt={apartment.name}
            />
          )||
          <img
            src={`${process.env.PUBLIC_URL}/images/aparts/1.jpg`}
            alt={apartment.name}
          />}

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
              <ul>
                {apartment.more.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {apartment.advertizer && apartment.advertizer.email && (
            <p>
              <strong>מפרסם:</strong> {apartment.advertizer.email}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ApartmentCard;
