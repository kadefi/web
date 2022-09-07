import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";
import CountUp from "react-countup";
import FetchLoadingIndicator from "../../commons/FetchLoadingIndicator";
import TypographyNeon from "../../commons/TypographyNeon";
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
  const isPageFetching = Boolean(useIsFetching());

  return (
    <>
      <NetWorthTitle>
        Net Worth
        {isPageFetching && <FetchLoadingIndicator />}
      </NetWorthTitle>
      <NetWorthAmount>
        <div>
          <CountUp end={getNetWorthValue(projectsNetWorth)} prefix="$ " separator="," decimals={2} duration={0.3} />
        </div>
      </NetWorthAmount>
    </>
  );
};

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 20px;
  }
`;

export default NetWorth;
