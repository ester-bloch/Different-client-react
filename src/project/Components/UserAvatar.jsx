import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MyButton } from "./MyButton.jsx";
import "./UserAvatar.css"; 
import { useNavigate } from "react-router";

const UserAvatar = ({ setIsTokenValid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.advertise.thisAdvertiser);
  const textToShow = user.name? user.name : user.email? user.email : "משתמש לא מזוהה";
  const now = new Date();
  const hours = now.getHours();

  let timeOfDay;

  if (hours < 6) {
    timeOfDay = "לילה";
  } else if (hours < 12) {
    timeOfDay = "בוקר";
  } else if (hours < 18) {
    timeOfDay = "צהריים";
  } else if (hours < 22) {
    timeOfDay = "ערב";
  } else {
    timeOfDay = "לילה";
  }
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("different_token");
    localStorage.removeItem("different_decoded_Token");
    localStorage.removeItem("different_this_advertiser");
    setIsTokenValid(false);
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
        <MyButton backgroundColor={"#6c757d"} textToShow={textToShow + "  " + timeOfDay + "  טוב" + " "} myOnClick={handleLogoutClick}></MyButton>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>האם אתה בטוח שברצונך להתנתק מחשבונך??</p>
            <div className="button-container">
              <MyButton myOnClick={handleConfirmLogout} iconName={"fa-solid fa-sign-out-alt"} textToShow={"אישור"} />
              <MyButton myOnClick={handleCancelLogout} iconName={"fa-solid fa-undo"} textToShow={"ביטול"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
