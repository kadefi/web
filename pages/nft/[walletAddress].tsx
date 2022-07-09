import styled from "@emotion/styled";
import MuiContainer from "@mui/material/Container";
import { getDashboardLayout } from "../../src/layouts/DashboardLayout";
import { CustomNextPage } from "../../src/types/Page.type";

const NftGallery: CustomNextPage = () => {
  return <Container maxWidth="md">NFT Gallery</Container>;
};

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

NftGallery.getLayout = getDashboardLayout;

export default NftGallery;
