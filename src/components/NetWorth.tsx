import { Typography } from "@mui/material";
import { NetWorthMap } from "../types/DashboardData.type";
import { roundToDecimal } from "../utils/Number.util";
import TypographyNeon from "./commons/TypographyNeon";
import CountUp from "react-countup";

type Props = {
  netWorthMap: NetWorthMap;
};

const NetWorth = (props: Props) => {
  const { netWorthMap } = props;

  const netWorth = Object.values(netWorthMap).reduce((partialSum, nextVal) => {
    partialSum = partialSum || 0;
    nextVal = nextVal || 0;
    return partialSum + nextVal;
  }, 0);

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
        {netWorth !== null && (
          <CountUp end={netWorth} decimals={2} duration={0.3} />
        )}
      </TypographyNeon>
    </>
  );
};

export default NetWorth;
