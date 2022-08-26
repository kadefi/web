import { useRouter } from "next/router";
import { MENU_CONFIG } from "../components/layouts/PageLayout/Menu.config";

export const useCurrentMenu = () => {
  const router = useRouter();

  const currentMenu = MENU_CONFIG.filter((config) => config.route && router.pathname.startsWith(config.route))[0];

  return { currentMenu };
};
