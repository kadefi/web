import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import IntegrationPill from "../../src/components/commons/IntegrationPill";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { getPageLayout } from "../../src/layouts/PageLayout";

const Integrations = () => {
  const { nftCollectionsList, projectsList } = usePageLayoutContext();

  if (!nftCollectionsList || !projectsList) {
    return (
      <Container maxWidth="md">
        <LoadingSkeleton variant="rectangular" />
        <LoadingSkeleton variant="rectangular" />
      </Container>
    );
  }

  const projectIntegrations = (
    <IntegrationsSection>
      <TypographyNeon variant="h4" sx={{ marginBottom: "1rem" }}>
        Project Integrations
      </TypographyNeon>
      <Subtitle variant="subtitle2">Please select the projects to be shown on the Dashboard page</Subtitle>
      <PillsContainer>
        {projectsList.map((project) => {
          return (
            <IntegrationPill
              key={project.module}
              name={project.name}
              // module={project.module}
              socialLink={project.social}
              image={project.image}
            />
          );
        })}
      </PillsContainer>
    </IntegrationsSection>
  );

  const nftIntegrations = (
    <IntegrationsSection>
      <TypographyNeon variant="h4" sx={{ marginBottom: "1rem" }}>
        NFT Collections Integrations
      </TypographyNeon>
      <Subtitle variant="subtitle2">Please select the NFT collections to be shown on the NFT Gallery page</Subtitle>
      <PillsContainer>
        {nftCollectionsList.map((collection) => {
          return (
            <IntegrationPill
              key={collection.module}
              name={collection.name}
              description={collection.description}
              // module={collection.module}
              socialLink={collection.social}
            />
          );
        })}
      </PillsContainer>
    </IntegrationsSection>
  );

  return (
    <Container maxWidth="md">
      {projectIntegrations}
      {nftIntegrations}
    </Container>
  );
};

const Subtitle = styled(Typography)`
  margin-bottom: 2rem;
`;

const IntegrationsSection = styled.div`
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

const PillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
`;

const Container = styled(MuiContainer)`
  padding: 2rem;
`;

const LoadingSkeleton = styled(Skeleton)`
  height: 15rem;
  margin-bottom: 2rem;
`;

Integrations.getLayout = getPageLayout;

export default Integrations;
