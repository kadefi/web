import styled from "@emotion/styled";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";

const CustomCircularProgress = (props: CircularProgressProps) => {
  return <StyledCircularProgress disableShrink {...props} />;
};

const StyledCircularProgress = styled(CircularProgress)({
  color: "white",
  animationDuration: "500ms",
});

export default CustomCircularProgress;
