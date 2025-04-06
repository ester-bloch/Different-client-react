import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "../Components/Home";
import Blog from "../Components/Blog";
import Post1 from "../Components/Post1";
import AboutUs from "../Components/AboutUs";
import { RegisterOrUpdate } from "../Components/Register";
import { useSelector } from "react-redux";
import { LoginModal } from "../Components/LoginModal";

export const Routing = () => {
  const location = useLocation();
  const posts = useSelector((s) => s.post.posts);
  useEffect(() => {
    // שינוי ה-title לפי הנתיב הנוכחי
    switch (location.pathname) {
      case "/Home":
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
      case "/post":
        document.title = "post Page";
        break;
      case "/blog":
        document.title = "blog Page";
        break;
      // הוסף כאן מקרים נוספים עבור נתיבים אחרים
      default:
        document.title = "Default Title";
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="blog" element={<Blog />}>
          {" "}
        </Route>
        <Route path="post" element={<Post1></Post1>} />
        <Route path="Login" element={<LoginModal></LoginModal>} />
        <Route path="register" element={<RegisterOrUpdate></RegisterOrUpdate>} />
        <Route path="aboutus" element={<AboutUs></AboutUs>} />
        <Route path="" element={<Navigate to="Home" />} />
      </Routes>
    </>
  );
};
