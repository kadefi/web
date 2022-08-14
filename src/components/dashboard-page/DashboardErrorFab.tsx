import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import CircularProgress from "../../commons/CircularProgress";
import theme from "../../theme";
import { ProjectData, TokenCellType, WalletData } from "../../types/DashboardData.type";
import { ProjectErrorResponse } from "../../types/Project.type";
import { getDashboardErrors } from "../../utils/DashboardError.util";

type DashboardErrorFabProps = {
  loading: boolean;
  walletQuery: UseQueryResult<WalletData>;
  projectsQuery: UseQueryResult<ProjectData>[];
};

const DashboardErrorFab = ({ loading, walletQuery, projectsQuery }: DashboardErrorFabProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { tokenErrors, projectErrors } = getDashboardErrors(walletQuery, projectsQuery);
  const hasError = !tokenErrors || tokenErrors.length !== 0 || projectErrors.length !== 0;

  const icon = hasError ? <PriorityHighIcon /> : <DoneIcon />;
  const color = hasError ? "warning" : "success";
  const content = loading ? (
    <Fab size="small" disableRipple>
      <CircularProgress size={20} color="secondary" />
    </Fab>
  ) : (
    <ClickAwayListener onClickAway={handleClose}>
      <Tooltip
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top"
        title={<ErrorsTooltip hasError={hasError} tokenErrors={tokenErrors} projectErrors={projectErrors} />}
        arrow
        onClose={handleClose}
      >
        <span>
          <Fab onClick={handleOpen} color={color} size="medium" disableRipple>
            {icon}
          </Fab>
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
  return <FabContainer>{content}</FabContainer>;
};

const FabContainer = styled(Box)({
  position: "fixed",
  bottom: 24,
  right: 24,

  [`${theme.breakpoints.down("sm")}`]: {
    bottom: 16,
    right: 16,
  },
});

type ErrorsTooltipProps = {
  tokenErrors: TokenCellType[] | null;
  projectErrors: ProjectErrorResponse[];
  hasError: boolean;
};

const ErrorsTooltip = ({ hasError, tokenErrors, projectErrors }: ErrorsTooltipProps) => {
  if (!hasError) {
    return <p>All fetch successful!</p>;
  }
  const tokenFetchError = !tokenErrors && "Failed to query wallet balance";
  const individualTokenError = tokenErrors && tokenErrors.map((error) => <p key={error.ticker}>{error.ticker}</p>);
  const individualProjectsError = projectErrors.map((error) => <p key={error.name}>{error.name}</p>);

  return (
    <div>
      {tokenFetchError}
      {individualTokenError && <h4>Failed token fetches</h4>}
      {individualTokenError}
      {individualProjectsError.length !== 0 && <h4>Failed project fetches</h4>}
      {individualProjectsError}
    </div>
  );
};

export default DashboardErrorFab;
