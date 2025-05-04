import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "../Components/Home";
import Blog from "../Components/Blog";
import Post1 from "../Components/Post1";
import AboutUs from "../Components/AboutUs";
import { RegisterOrUpdate } from "../Components/Register";
import { LoginModal } from "../Components/LoginModal";
import { PersonalErea } from "../Components/Personal-Area";
import { UpdateApartment } from "../Components/UpdateApartment";
import { UpdateAdvertiser } from "../Components/UpdateAdvertiser";
import { ShowApartPage } from "../Components/ShowApartPage";
import { AddApartment } from "../Components/AddApartment";
import AdvancedSearch from "../Components/AdvancedSearch";

export const Routing = () => {
  const location = useLocation();

  useEffect(() => {
    // שינוי ה-title לפי הנתיב הנוכחי
    switch (location.pathname) {
      case "/Home":
        document.querySelector("link[rel*='icon']").href = `${process.env.PUBLIC_URL}/images/logo/logo.png`; // שינוי האיקון
        document.title = "Home Page";
        break;
      case "/login":
        document.title = "Login Page";
        break;
      case "/aboutus":
        document.title = "aboutus Page";
        break;
      case "/register":
        document.title = "register Page";
        break;
      case "/personal-area":
        document.title = "personal-area";
        break;
      case "/post":
        document.title = "post Page";
        break;
      case "/blog":
        document.title = "blog Page";
        break;
      // הוסף כאן מקרים נוספים עבור נתיבים אחרים
      default:
        document.title = "different";
        document.querySelector("link[rel*='icon']").href = `${process.env.PUBLIC_URL}/images/logo/logo.png`; // שינוי האיקון
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="Home" element={<Home />}>
          <Route path="showApart" element={<ShowApartPage open={true} />} />
        </Route>
        <Route path="blog" element={<Blog />}>
          {" "}
        </Route>
        <Route path="post" element={<Post1></Post1>} />
        <Route path="Login" element={<LoginModal></LoginModal>} />
        <Route path="register" element={<RegisterOrUpdate></RegisterOrUpdate>} />
        <Route path="aboutus" element={<AboutUs></AboutUs>} />
        <Route path="AdvancedSearch" element={<AdvancedSearch></AdvancedSearch>} />
        <Route path="personal-area" element={<PersonalErea></PersonalErea>}>
          <Route path="editDetails" element={<UpdateAdvertiser open={true}></UpdateAdvertiser>}>
            {" "}
          </Route>
          <Route path="updateApart" element={<UpdateApartment open={true}></UpdateApartment>}/>
          <Route path="addApart" element={<AddApartment open={true}></AddApartment>}>
            {" "}
          </Route>
        </Route>
        <Route path="" element={<Navigate to="Home" />} />
      </Routes>
    </>
  );
};
