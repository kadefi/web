import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGetProjectData } from "../../../api/queries/Dashboard.queries";
import FetchLoadingIndicator from "../../../commons/FetchLoadingIndicator";
import Paper from "../../../commons/Paper";
import PngLogo from "../../../commons/PngLogo";
import TypographyNeon from "../../../commons/TypographyNeon";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import theme from "../../../theme";
import { formatFiatValue } from "../../../utils/Number.util";
import { getQueriesResults } from "../../../utils/QueriesUtil";
import ProjectDataTable from "./ProjectDataTable";

type Props = {
  projectModule: string;
  handleNetWorthUpdate: (module: string, netWorth: number) => void;
};

const MOCK_WALLET_ADDRESSES = [
  "k:ca237063d821a34f8004e52d93b36715d75566a85164c6268c4aa61ecf176a57",
  "k:001ad386f24013dade4cc2ea9d1fd7ef27605591172e69ce4282a634584acfa9",
  "k:456ff7642ec4f59f1685bd8bbe35f4b7ab7b2c688e16582a823e596370401258",
  "k:609466382bc22b6c19f030acddaacba0d5f2aeb299dca4694d3bc104e34df654",
  "k:991a3f4acc07275e732231031a3c7522b6e918c214b4a94d6ac485451e55593e",
];

const ProjectCard = (props: Props) => {
  const { projectModule, handleNetWorthUpdate: handleProjectNetWorthUpdate } = props;
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectImgSrc, setProjectImgSrc] = useState<string | null>(null);
  const [projectNetWorth, setProjectNetWorth] = useState<number | null>(null);
  const {
    // TODO: Use walletAddresses from page layout context
    // walletAddresses,
    projectsList,
    selectedProjectModules,
  } = usePageLayoutContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queries = useGetProjectData(
    projectModule,
    // TODO: Remove mock wallet address
    MOCK_WALLET_ADDRESSES,
    selectedProjectModules.includes(projectModule),
  );
  const isFetching = Boolean(useIsFetching([projectModule]));
  const projectsData = getQueriesResults(queries);
  const isDataAvailable = !isFetching && projectsData.length > 0;
  const isDataNotAvailable = projectsData.length === 0;
  const isMultiWallet = MOCK_WALLET_ADDRESSES.length >= 2;

  useEffect(() => {
    if (projectsList) {
      const project = projectsList.filter((p) => p.module === projectModule)[0];
      setProjectName(project.name);
      setProjectImgSrc(project.image);
    }
  }, [projectModule, projectsList]);

  useEffect(() => {
    if (isDataAvailable) {
      const totalValue = projectsData.reduce((acc, current) => {
        return acc + (current.fiatValue || 0);
      }, 0);
      setProjectNetWorth(totalValue);
    }
  }, [isDataAvailable, projectModule, projectsData]);

  useEffect(() => {
    if (projectNetWorth) {
      handleProjectNetWorthUpdate(projectModule, projectNetWorth);
    }
  }, [projectModule, projectNetWorth, handleProjectNetWorthUpdate]);

  if (isDataNotAvailable) {
    return null;
  }

  return (
    <CardWrapper>
      <CardHeader>
        <ProjectHeader>
          {projectImgSrc && <PngLogo src={projectImgSrc} size={1.75} />}
          <ProjectNameContainer>
            {projectName}
            {isFetching && <FetchLoadingIndicator />}
          </ProjectNameContainer>
        </ProjectHeader>
        <ProjectNetWorth>{projectNetWorth && formatFiatValue(projectNetWorth)}</ProjectNetWorth>
      </CardHeader>
      <ProjectDataTable projectsData={projectsData} isMobile={isMobile} isMultiWallet={isMultiWallet} />
    </CardWrapper>
  );
};

const ProjectNameContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CardWrapper = styled(Paper)({
  paddingBottom: "1rem",
  marginBottom: "2rem",
});

const ProjectHeader = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  display: "flex",
  gap: "8px",
  alignItems: "center",

  [`${theme.breakpoints.down("sm")}`]: {
    fontSize: "1rem",
  },
});

const ProjectNetWorth = styled(TypographyNeon)({
  fontSize: "1.25rem",
  fontWeight: "500",

  [`${theme.breakpoints.down("sm")}`]: {
    fontSize: "1rem",
  },
});

const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "1rem",
  margin: "0 1rem 1rem 1rem",
});

export default ProjectCard;
