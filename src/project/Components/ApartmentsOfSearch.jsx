import { useEffect, useState } from "react";
import { getAllApartments } from "../scripts/api";
import ApartmentCard from "./ApartmentCard";
import "./ApartmentCard.css"; 
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

export const ApartmentsOfSearch = () => {
  const apartments = useSelector((state) => state.advertise.searchAparts);
  useEffect(()=>{ },[])
  return (
    
    <>
    <Outlet></Outlet>
      <div className="allAparts">
        {apartments && apartments.map((a) => (
            <ApartmentCard apartment={a} key={a._id}></ApartmentCard>
          ))}
      </div>
    </>
  );
};
