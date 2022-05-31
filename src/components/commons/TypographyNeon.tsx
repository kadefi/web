import { styled, Typography, TypographyProps } from "@mui/material";

const TypographyNeon = (props: TypographyProps) => {
  return <StyledTypography {...props} />;
};

const StyledTypography = styled(Typography)({
  textShadow: "0px 0px 10px #FF007F",
});

export default TypographyNeon;
