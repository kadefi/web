import Container from "@mui/material/Container";
import { getPageLayout } from "../../src/layouts/PageLayout";

const Integrations = () => {
  return (
    <Container maxWidth="md">
      <div>Integrations Page</div>
    </Container>
  );
};

Integrations.getLayout = getPageLayout;

export default Integrations;
