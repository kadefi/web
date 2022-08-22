import styled from "@emotion/styled";
import { Skeleton, Typography } from "@mui/material";
import CountUp from "react-countup";
import TypographyNeon from "../../commons/TypographyNeon";
import useIsPageFetching from "../../hooks/useIsPageFetching";
import theme from "../../theme";
import { ProjectsNetWorth } from "../../types/DashboardData.type";

const getNetWorthValue = (projectValues: ProjectsNetWorth) => {
  return Object.values(projectValues).reduce((prev, current) => prev + current, 0);
};

type Props = {
  netWorthMap: ProjectsNetWorth;
};

const NetWorth = (props: Props) => {
  const { netWorthMap: projectsNetWorth } = props;
  const isPageFetching = useIsPageFetching();

  return (
    <>
      <NetWorthTitle>Net Worth</NetWorthTitle>
      <NetWorthAmount>
        {isPageFetching ? (
          <NetWorthAmountSkeleton />
        ) : (
          <div>
            <CountUp end={getNetWorthValue(projectsNetWorth)} prefix="$ " separator="," decimals={2} duration={0.3} />
          </div>
        )}
      </NetWorthAmount>
    </>
  );
};

const NetWorthAmountSkeleton = styled(Skeleton)({
  width: "10rem",
});

const NetWorthAmount = styled(TypographyNeon)`
  font-size: 52px;
  margin-bottom: 1rem;
  font-weight: 400;

  ${theme.breakpoints.down("sm")} {
    font-size: 40px;
  }
`;

const NetWorthTitle = styled(Typography)`
  font-size: 24px;
  font-weight: bold;

  ${theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

export default NetWorth;
