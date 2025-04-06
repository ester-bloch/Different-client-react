import { MyButton } from "./MyButton";

import { Modal, Box, TextField, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { Login } from "../scripts/api";
import { useDispatch } from "react-redux";
import { setAdvertiser, setToken } from "../Data-Redux/advertiserRedux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export const LoginModal = ({ setIsTokenValid }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f0f8ff", // צבע רקע מעניין (כחול בהיר)
    border: "1px solid rgba(0, 123, 255, 0.5)", // גבול רך עם שקיפות
    borderRadius: "30px", // גבולות רכים יותר
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)", // הצללה רכה
    p: 4,
    transition: "box-shadow 0.3s ease", // מעבר חלק
    "&:hover": {
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)", // הצללה בולטת יותר בהובר
    },
  };

  const handleClose = () => {
    Login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then((data) => {
        let { token, thisAdvertiser } = data.data;
        dispatch(setAdvertiser(thisAdvertiser));
        dispatch(setToken(token));
        const decoded = jwtDecode(token);
        localStorage.setItem("different_decoded_Token", JSON.stringify(decoded));
        localStorage.setItem("different_token", token);
        console.log(data);
        setIsTokenValid(true)
        navigate("../");
      })
      .catch((err) => {
        navigate("./Register");
      });
    setOpen(false);
  };

  return (
    <>
      <MyButton iconName={"fa-solid fa-sign-in-alt"} myOnClick={handleOpen} textToShow={"כניסת מפרסם"} myType={"button"} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
            {" "}
            {/* צבע טקסט כהה */}
            כניסת מפרסם
          </h2>
          <TextField
            label="מייל"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={emailRef} // חיבור ה-ref לשדה הקלט
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // גבול בהיר לשדה קלט
                },
                "&:hover fieldset": {
                  borderColor: "#888", // גבול כהה יותר בהובר
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5", // גבול צבע מותאם כאשר השדה בפוקוס
                },
              },
            }}
          />
          <TextField
            label="סיסמא"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={passwordRef} // חיבור ה-ref לשדה הקלט
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{
              borderRadius: "8px",
              width: "100%",
              marginTop: "16px",
              "&:hover": {
                backgroundColor: "#0056b3", // צבע כהה יותר בהובר
                transform: "scale(1.05)", // הגדלה קלה בעת ה-hover
              },
            }}>
            אישור
          </Button>
        </Box>
      </Modal>
    </>
  );
};
