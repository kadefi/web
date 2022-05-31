import styled from "@emotion/styled";
import MuiPaper from "@mui/material/Paper";

const CustomPaper = styled(MuiPaper)({
  background: "rgba(34, 0, 35, 0.7)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
});

export default CustomPaper;
