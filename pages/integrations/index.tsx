import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import MuiContainer from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import { useTrackPageVisit } from "../../src/analytics/useTrackPageVisit";
import TypographyNeon from "../../src/commons/TypographyNeon";
import IntegrationPill from "../../src/components/integrations-page/IntegrationPill";
import TwitterButton from "../../src/components/misc/TwitterButton";
import { ROUTE } from "../../src/constants/Routes.constant";
import { usePageLayoutContext } from "../../src/contexts/PageLayoutContext";
import { getPageLayout } from "../../src/layouts/PageLayout";
import { NftCollectionsListItem, ProjectsListItem } from "../../src/types/DashboardData.type";

const Integrations = () => {
  const {
    nftCollectionsList,
    projectsList,
    selectedNftModules,
    handleNftModuleToggle,
    selectedProjectModules,
    handleProjectModuleToggle,
  } = usePageLayoutContext();

  useTrackPageVisit(ROUTE.INTEGRATIONS);

  return (
    <Container maxWidth="md">
      <IntegrationRequestText>
        <TwitterButton subtext="For integration request, contact us" />
      </IntegrationRequestText>
      <IntegrationSection
        title="Project Integrations"
        subtitle="Please select the projects to be shown on the Dashboard page"
        listData={projectsList}
        selectedModule={selectedProjectModules}
        handleModuleToggle={handleProjectModuleToggle}
      />
      <IntegrationSection
        title="NFT Collections Integrations"
        subtitle="Please select the NFT collections to be shown on the NFT Gallery page"
        listData={nftCollectionsList}
        selectedModule={selectedNftModules}
        handleModuleToggle={handleNftModuleToggle}
      />
    </Container>
  );
};

const IntegrationSection = (props: {
  title: string;
  subtitle: string;
  listData?: (ProjectsListItem | NftCollectionsListItem)[];
  selectedModule: string[];
  handleModuleToggle: (module: string) => void;
}) => {
  const { title, subtitle, listData, selectedModule, handleModuleToggle } = props;

  if (!listData) {
    return <LoadingSkeleton variant="rectangular" />;
  }

  return (
    <IntegrationsSectionContainer>
      <TypographyNeon variant="h4" sx={{ marginBottom: "1rem" }}>
        {title}
      </TypographyNeon>
      <Subtitle variant="subtitle2">{subtitle}</Subtitle>
      <PillsContainer>
        {listData.map((listItem) => {
          return (
            <IntegrationPill
              key={listItem.module}
              name={listItem.name}
              module={listItem.module}
              description={listItem.description}
              isSelected={selectedModule.includes(listItem.module)}
              handleToggle={handleModuleToggle}
              socialLink={listItem.social}
              image={listItem.image}
            />
          );
        })}
      </PillsContainer>
    </IntegrationsSectionContainer>
  );
};

const IntegrationRequestText = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Subtitle = styled(Typography)`
  margin-bottom: 2rem;
`;

const IntegrationsSectionContainer = styled.div`
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
