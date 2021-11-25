import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Icon from '@mui/material/Icon';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 750,
  bgcolor: "transparent",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddMusicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Icon onClick={handleOpen}>+</Icon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>coucou</h2>
          <Button onClick={handleClose}>close</Button>
        </Box>
      </Modal>
    </div>
  );
}
