import { NavLink } from "react-router-dom";
import "./Style.css";
import "./nav.css";
import { useEffect, useState } from "react";
import { checkTokenValidity } from "../scripts/Token";
import UserAvatar from "../Components/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { setAdvertiser } from "../Data-Redux/advertiserRedux";
import { LoginModal } from "../Components/LoginModal";

export const Nav = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const thisAdvertiser = useSelector((s) => s.advertise.thisAdvertiser);
  console.log(thisAdvertiser)
  const dispatch = useDispatch();
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("different_token"); // שנה ל-key שלך
    let ok = checkTokenValidity(token);
    setIsTokenValid(ok); // בדוק תוקף טוקן
    if (ok) dispatch(setAdvertiser(JSON.parse(localStorage.getItem("different_decoded_Token"))));
  }, [isTokenValid]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      <nav className={`Nav ${isFixed ? "fixed" : ""}`}>
        <div className="forLogo">
          <img src={`${process.env.PUBLIC_URL}/images/logo/logo.png`} alt="Logo" className="logo" />
        </div>
        <div className="NavLinks">
          <NavLink to="/Home" className="NavLink">
            בית
          </NavLink>
          <NavLink to="/search" className="NavLink">
            חיפוש מתקדם
          </NavLink>
          <NavLink to="Blog" className="NavLink">
            בלוג
          </NavLink>
          <NavLink to="/aboutus" className="NavLink">
            קצת עלינו...
          </NavLink>
        </div>
        <div className="forLogin">{thisAdvertiser && isTokenValid ? <UserAvatar setIsTokenValid={setIsTokenValid} /> : <LoginModal setIsTokenValid={setIsTokenValid} />}</div>
      </nav>
    </>
  );
};
