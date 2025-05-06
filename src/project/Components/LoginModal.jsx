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
  const errorOptions = {
    name: "שם קצר מידי",
    email: "כתובת מייל לא תקינה",
    password: "סיסמא לא תקינה",
    password2: "סיסמא חייבת להיות תואמת",
    phoneNumber: "מספר טלפון חייב להכיל 10 ספרות",
    phoneNumber2: "מספר טלפון חייב להכיל 10 ספרות",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleOpen = () => {
    if (open) {
      setEmailError("");
      setPasswordError("");
    }
    setOpen(!open);
  };
  const emailRef = useRef();
  const text = process.env.NODE_ENV === 'development' ? "develop" : "notDevelop";
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f0f8ff",
    border: "1px solid rgba(0, 123, 255, 0.5)",
    borderRadius: "30px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    p: 4,
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
    },
  };

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("מייל לא תקין");
    } else {
      setEmailError("");
    }
  };
  
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("אנא הכנס סיסמא");
    } else {
      setPasswordError("");
    }
  };
  
  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError("אנא הכנס מייל");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("מייל לא תקין");
      valid = false;
    }

    if (!password) {
      setPasswordError("אנא הכנס סיסמא");
      valid = false;
    }

    return valid;
  };

  const handleClose = () => {
    if (validateForm()) {
      let details = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      Login(details)
        .then((ans) => {
          let { token, thisAdvertiser } = ans.data;
          delete thisAdvertiser[password];
          dispatch(setAdvertiser(thisAdvertiser));
          dispatch(setToken(token));
          const decoded = jwtDecode(token);
          localStorage.setItem("different_decoded_Token", JSON.stringify(decoded));
          localStorage.setItem("different_token", token);
          localStorage.setItem("different_this_advertiser", JSON.stringify(thisAdvertiser));
          setIsTokenValid(true);
          navigate("../");
        })
        .catch((err) => {
          navigate("./Register");
        });
      setOpen(false);
    }
  };

  return (
    <>
      <MyButton iconName={"fa-solid fa-sign-in-alt"} myOnClick={handleOpen} textToShow={"כניסת מפרסם"} myType={"button"} />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEmailError("");
          setPasswordError("");
        }}>
        <Box sx={style}>
          <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>כניסת מפרסם</h2>
          <TextField
            label={"mail"}
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={emailRef}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
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
          <TextField
            label="סיסמא"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={passwordRef}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            error={!!passwordError}
            helperText={passwordError}
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
            onClick={() => {
              if (validateForm()) {
                handleClose();
              }
            }}
            sx={{
              borderRadius: "8px",
              width: "100%",
              marginTop: "16px",
              "&:hover": {
                backgroundColor: "#0056b3",
                transform: "scale(1.05)",
              },
            }}>
            אישור
          </Button>
        </Box>
      </Modal>
    </>
  );
};
