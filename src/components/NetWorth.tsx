import { Typography } from "@mui/material";
import TypographyNeon from "./commons/TypographyNeon";

const NetWorth = () => {
  return (
    <>
      <Typography
        fontSize={"24px"}
        fontWeight={"bold"}
        sx={{ pl: "1rem", mt: "1rem" }}
      >
        Net Worth
      </Typography>
      <TypographyNeon fontSize={"48px"} sx={{ pl: "1rem", mb: "1rem" }}>
        $420.69
      </TypographyNeon>
    </>
  );
};

export default NetWorth;
