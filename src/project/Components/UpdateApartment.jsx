import React, { useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { deleteApartment, updateApartment } from "../scripts/api";
import {  useNavigate } from "react-router";
import { MyButton } from "./MyButton";
import useParentPath from "../scripts/ParetntPath";
import { CreaterOrUpdateApartment } from "./CreateUpdateApart";

export const UpdateApartment = ({ handleClose, handleConfirm }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const parenrPath = useParentPath();
  const thisApart = useSelector((s) => s.advertise.thisApartment);
  console.log(thisApart)
  if (!handleClose)
    handleClose = () => {
      setOpen(false);
      navigate(parenrPath); // ניתוב לנתיב החדש
    };
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          {/* <Button variant="contained" color="primary" onClick={handleConfirm}>
            אישור
          </Button> */}

          <MyButton myOnClick={handleClose} textToShow={"ביטול"} iconName={"fa-solid fa-window-close"} backgroundColor={"red"} />
          <MyButton myOnClick={()=>{
            alert("האם אתה בטוח שברצונך למחוק את הדירה?")
            deleteApartment(thisApart)}} textToShow={"למחיקת הדירה"} iconName={"fa-regular fa-trash-alt"} backgroundColor={"red"} />
        </Box>
        <CreaterOrUpdateApartment textForH1={"עדכון פרטי דירה"} apartment={thisApart} functionToUpdate={updateApartment} />
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
  maxHeight: '80vh', // הגבלת גובה החלון ל-80% מגובה המסך
  overflowY: 'auto', // הוספת גלילה אנכית
};


export default UpdateApartment;
