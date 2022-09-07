import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useMemo } from "react";
import { useGetProjectData } from "../../../api/queries/Dashboard.queries";
import FetchLoadingIndicator from "../../../commons/FetchLoadingIndicator";
import Paper from "../../../commons/Paper";
import PngLogo from "../../../commons/PngLogo";
import TypographyNeon from "../../../commons/TypographyNeon";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import theme from "../../../theme";
import { formatFiatValue } from "../../../utils/Number.util";
import ProjectDataTable from "./ProjectDataTable";

type Props = {
  projectModule: string;
  handleNetWorthUpdate: (module: string, netWorth: number) => void;
};

const ProjectCard = (props: Props) => {
  const { projectModule, handleNetWorthUpdate: handleProjectNetWorthUpdate } = props;
  const { walletAddresses, projectsList, selectedProjectModules } = usePageLayoutContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { projectsData, isLoading, isFetching } = useGetProjectData(
    projectModule,
    walletAddresses,
    selectedProjectModules.includes(projectModule),
  );

  const isDataAvailable = useMemo(
    () => walletAddresses && !isLoading && projectsData.length > 0,
    [isLoading, projectsData.length, walletAddresses],
  );

  const isMultiWallet = useMemo(() => (walletAddresses ? walletAddresses.length >= 2 : false), [walletAddresses]);

  const project = useMemo(
    () => (projectsList ? projectsList.filter((p) => p.module === projectModule)[0] : null),
    [projectModule, projectsList],
  );

  const [projectName, projectImgSrc] = useMemo(
    () => (project ? [project.name, project.image] : [null, null]),
    [project],
  );

  const totalProjectValue = useMemo(
    () =>
      projectsData.reduce((acc, current) => {
        return acc + (current.fiatValue || 0);
      }, 0),
    [projectsData],
  );

  useEffect(() => {
    !isLoading && handleProjectNetWorthUpdate(projectModule, totalProjectValue);
  }, [totalProjectValue, projectModule, handleProjectNetWorthUpdate, isFetching, isLoading]);

  if (!isDataAvailable) {
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
        <ProjectNetWorth>{totalProjectValue && formatFiatValue(totalProjectValue)}</ProjectNetWorth>
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
