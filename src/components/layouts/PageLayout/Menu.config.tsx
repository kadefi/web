import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { Route } from "../../../enums/Route.enum";
import { MenuConfigItem } from "../../../types/Menu.type";

export const MENU_CONFIG: MenuConfigItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    route: Route.Dashboard,
    isWalletSearch: true,
    isDisabled: false,
  },
  {
    title: "NFT Gallery",
    icon: <PhotoLibraryOutlinedIcon />,
    route: Route.NftGallery,
    isWalletSearch: true,
    isDisabled: false,
  },
  {
    title: "Integrations",
    icon: <CableOutlinedIcon />,
    route: Route.Integrations,
    isWalletSearch: false,
    isDisabled: false,
  },
  {
    title: "Project History",
    icon: <TimelineOutlinedIcon />,
    route: null,
    isWalletSearch: false,
    isDisabled: true,
  },
  {
    title: "Tools",
    icon: <ConstructionOutlinedIcon />,
    route: null,
    isWalletSearch: false,
    isDisabled: true,
  },
];
