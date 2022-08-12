import styled from "@emotion/styled";
import MuiCircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";

type Props = {
  className?: string;
} & CircularProgressProps;

const CircularProgress = (props: Props) => {
  return <StyledCircularProgress disableShrink {...props} />;
};

const StyledCircularProgress = styled(MuiCircularProgress)({
  color: "white",
  animationDuration: "500ms",
});

export default CircularProgress;
