import Container from "@mui/material/Container";
import { NextPage } from "next";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import { Page } from "../../src/types/Page.type";

const NftGallery: NextPage & Page = () => {
  return <Container maxWidth="md">NFT Gallery</Container>;
};

NftGallery.getLayout = getDashboardLayout;

export default NftGallery;
