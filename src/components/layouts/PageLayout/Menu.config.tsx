import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { ROUTE } from "../../../constants/Routes.constant";

export enum MENU_TITLE {
  DASHBOARD = "Dashboard",
  NFT = "NFT Gallery",
  INTEGRATIONS = "Integrations",
  PROJECT_HISTORY = "Portfolio History",
  TOOLS = "Tools",
}

export const MENU_CONFIG = {
  [MENU_TITLE.DASHBOARD]: {
    icon: <DashboardOutlinedIcon />,
    route: ROUTE.DASHBOARD,
    isWalletSearch: true,
    isDisabled: false,
  },
  [MENU_TITLE.NFT]: {
    icon: <PhotoLibraryOutlinedIcon />,
    route: ROUTE.NFT_GALLERY,
    isWalletSearch: true,
    isDisabled: false,
  },
  [MENU_TITLE.INTEGRATIONS]: {
    icon: <CableOutlinedIcon />,
    route: ROUTE.INTEGRATIONS,
    isWalletSearch: false,
    isDisabled: false,
  },
  [MENU_TITLE.PROJECT_HISTORY]: {
    icon: <TimelineOutlinedIcon />,
    route: "",
    isWalletSearch: false,
    isDisabled: true,
  },
  [MENU_TITLE.TOOLS]: {
    icon: <ConstructionOutlinedIcon />,
    route: "",
    isWalletSearch: false,
    isDisabled: true,
  },
};
