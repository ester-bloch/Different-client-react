import React, { useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { RegisterOrUpdate } from "./Register";
import { useSelector } from "react-redux";
import { updateAdvertiser } from "../scripts/api";
import { useLocation, useNavigate } from "react-router";
import { MyButton } from "./MyButton";

export const UpdateAdvertiser = ({ handleClose, handleConfirm }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const fatherPath = location.pathname.split("/").slice(0, -1).join("/");
  if (!handleClose)
    handleClose = () => {
      setOpen(false);
      const pathSegments = location.pathname.split("/").filter((segment) => segment);
      pathSegments.pop();
      const newPath = `/${pathSegments.join("/")}`;
      navigate(fatherPath);
    };
  const thisAdvertiser = useSelector((s) => s.advertise.thisAdvertiser);
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <MyButton myOnClick={handleClose} textToShow={"ביטול"} iconName={"fa-solid fa-window-close"} backgroundColor={"red"} />
        </Box>
        <RegisterOrUpdate textForH1={"עדכון פרטים"} advertiser={thisAdvertiser} functionToUpdate={updateAdvertiser} />
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
