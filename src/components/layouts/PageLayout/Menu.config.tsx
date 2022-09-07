import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
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
];
