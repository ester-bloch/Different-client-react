import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MyButton } from "./MyButton.jsx";
import "./UserAvatar.css"; // קובץ CSS לעיצוב

const UserAvatar = ({setIsTokenValid}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // הנחה שהשם נמצא בסטור בנתיב 'user.name'
  const userEmail = useSelector(
    (state) => state.advertise.thisAdvertiser.email
  );
  // קבלת האות הראשונה מהשם
  const firstLetter = userEmail ? userEmail.split("@")[0] : "";
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
    // כאן תוכל להוסיף את הלוגיקה של ה-logout
    localStorage.removeItem("different_token")
    localStorage.removeItem("different_decoded_Token")
    setIsTokenValid(false)
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="user-avatar" onClick={handleLogoutClick}>
        {firstLetter} {timeOfDay} {"טוב"}{" "}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>האם אתה בטוח שברצונך להתנתק מחשבונך??</p>
            <div className="button-container">
              <MyButton
                myOnClick={handleConfirmLogout}
                iconName={"fa-solid fa-sign-out-alt"}
                textToShow={"אישור"}
              />
              <MyButton
                myOnClick={handleCancelLogout}
                iconName={"fa-solid fa-undo"}
                textToShow={"ביטול"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
