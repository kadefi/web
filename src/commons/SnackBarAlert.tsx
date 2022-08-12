import Alert, { AlertColor } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { TransitionProps } from "@mui/material/transitions";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
};

export const SnackBarAlert = (props: Props) => {
  const { isOpen, handleClose, message, severity, autoHideDuration = 3000 } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      TransitionComponent={TransitionUp}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarAlert;

function TransitionUp(props: Omit<TransitionProps, "children"> & SlideProps) {
  return <Slide {...props} direction="up" />;
}
