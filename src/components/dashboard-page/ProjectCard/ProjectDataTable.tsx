import styled from "@emotion/styled";
import { useMemo } from "react";
import { ProjectData } from "../../../types/DashboardData.type";
import { getFiatValuesMap } from "../../../utils/QueriesUtil";
import { sortComponentsByValueMap } from "../../../utils/Sort.util";
import WalletSectionWrapper from "../WalletSectionWrapper";
import ProjectSection from "./ProjectSection";

type Props = {
  projectsData: ProjectData[];
  isMobile: boolean;
  isMultiWallet: boolean;
};
const ProjectDataTable = (props: Props) => {
  const { projectsData, isMobile, isMultiWallet } = props;

  const { addresses, valuesMap } = useMemo(() => getFiatValuesMap(projectsData), [projectsData]);

  const walletSections = useMemo(() => {
    const sections = projectsData.map((projectData) => {
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
    });

    sortComponentsByValueMap(sections, addresses, valuesMap);

    return sections;
  }, [addresses, isMobile, isMultiWallet, projectsData, valuesMap]);

  return <Container>{walletSections}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default ProjectDataTable;
