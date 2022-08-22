import styled from "@emotion/styled";
import { ProjectData } from "../../../types/DashboardData.type";
import WalletSectionWrapper from "../WalletSectionWrapper";
import ProjectSection from "./ProjectSection";

type Props = {
  projectsData: ProjectData[];
  isMobile: boolean;
  isMultiWallet: boolean;
};
const ProjectDataTable = (props: Props) => {
  const { projectsData, isMobile, isMultiWallet } = props;

  return (
    <Container>
      {projectsData.map((projectData) => {
        const { module, address, fiatValue, sections } = projectData;

        return (
          <WalletSectionWrapper
            key={`${module}-${address}`}
            walletAddress={address}
            fiatValue={fiatValue}
            isMultiWallet={isMultiWallet}
          >
            {sections &&
              sections.map((section) => (
                <ProjectSection
                  key={`${module}-${section.sectionName}-${address}`}
                  section={section}
                  isMobile={isMobile}
                />
              ))}
          </WalletSectionWrapper>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default ProjectDataTable;
