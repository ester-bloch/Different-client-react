import React, { useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { addapart, deleteApartment, updateApartment } from "../scripts/api";
import {  useNavigate } from "react-router";
import { MyButton } from "./MyButton";
import useParentPath from "../scripts/ParetntPath";
import { CreaterOrUpdateApartment } from "./CreateUpdateApart";

export const AddApartment = ({ handleClose, handleConfirm }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const parenrPath = useParentPath();
  if (!handleClose)
    handleClose = () => {
      setOpen(false);
      navigate(parenrPath); 
    };
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <MyButton myOnClick={handleClose} textToShow={"ביטול"} iconName={"fa-solid fa-window-close"} backgroundColor={"red"} />
        </Box>
        {/* <p>juiu</p> */}
        <CreaterOrUpdateApartment textForH1={"הוספת דירה"} apartment={ null} functionToUpdate={addapart} />
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
  maxHeight: '80vh', 
  overflowY: 'auto', 
};


export default AddApartment;
