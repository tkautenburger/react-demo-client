import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function Popup(props) {

  const handleClose = () => {
    props.close({ ...props.settings, open: false});
  };

  return (
    <Snackbar 
      open={props.settings.open} 
      autoHideDuration={props.settings.duration} 
      onClose={handleClose}>
      <Alert 
        onClose={handleClose} 
        severity={props.settings.severity}>
        {props.settings.text}
      </Alert>
    </Snackbar>
    );

}

