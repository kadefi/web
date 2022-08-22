import { useRouter } from "next/router";
import { MENU_CONFIG, MENU_TITLE } from "../components/layouts/PageLayout/Menu.config";

export const useActiveMenu = () => {
  const router = useRouter();

  return Object.values(MENU_TITLE).filter((title) =>
    router.pathname.includes(MENU_CONFIG[title].route),
  )[0] as MENU_TITLE;
};
