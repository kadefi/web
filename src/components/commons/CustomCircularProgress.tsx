import styled from "@emotion/styled";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";

type Props = {
  className?: string;
} & CircularProgressProps;

const CustomCircularProgress = (props: Props) => {
  return <StyledCircularProgress disableShrink {...props} />;
};

const StyledCircularProgress = styled(CircularProgress)({
  color: "white",
  animationDuration: "500ms",
});

export default CustomCircularProgress;
