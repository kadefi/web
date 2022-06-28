import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import theme from "../theme";

const BackgroundImage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Image
      alt="Background"
      src={`/assets/${isMobile ? "mobile" : "desktop"}-background.svg`}
      layout="fill"
      objectFit="cover"
      quality={100}
      priority
    />
  );
};

export default BackgroundImage;
