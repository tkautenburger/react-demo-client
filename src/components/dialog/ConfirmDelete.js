import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function ConfirmDelete( {title, text, open, setOpen, result, setResult} ) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setResult(true);
    handleClose();
  };
  const handleNo = () => {
    setResult(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
            </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo} color="primary">
          No
            </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Yes
            </Button>
      </DialogActions>
    </Dialog>
  );

}

