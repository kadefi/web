import CustomCircularProgress from "./commons/CustomCircularProgress";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { ProjectData, TokenCellType, WalletData } from "../types/DashboardData.type";
import { ProjectInfoType } from "../types/Project.type";
import { UseQueryResult } from "react-query";
import { getDashboardErrors } from "../utils/DashboardError.util";
import { Fab } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

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
      <CustomCircularProgress size={20} color="secondary" />
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
  bottom: 30,
  right: 65,
});

type ErrorsTooltipProps = {
  tokenErrors: TokenCellType[] | null;
  projectErrors: ProjectInfoType[];
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
