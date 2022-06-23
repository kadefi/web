import { CircularProgress, CircularProgressProps, styled } from "@mui/material";

const CustomCircularProgress = (props: CircularProgressProps) => {
  return <StyledCircularProgress disableShrink {...props} />;
};

const StyledCircularProgress = styled(CircularProgress)({
  color: "white",
  animationDuration: "500ms",
});

export default CustomCircularProgress;
