import { useEffect, useState } from "react";
import { getAllApartments } from "../scripts/api";
import ApartmentCard from "./ApartmentCard";
import "./ApartmentCard.css"; // נניח שיש לך קובץ CSS נפרד

export const Apartments = () => {
  const [apartments, setApartments] = useState();

  useEffect(() => {
    getAllApartments()
      .then((data) => {
        setApartments(data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <div className="allAparts">
        {apartments &&apartments.map((a) => (
            <ApartmentCard apartment={a} key={a._id}></ApartmentCard>
          ))}
      </div>
    </>
  );
};
