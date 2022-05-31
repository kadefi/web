import { Box, Typography } from "@mui/material";
import TypographyNeon from "./commons/TypographyNeon";
import { styled } from "@mui/material/styles";
import CustomPaper from "./commons/CustomPaper";
import CustomTable from "./commons/CustomTable";
import { NetWorthMap, Section } from "../types/DashboardData.type";
import { getRowDisplay } from "../utils/Table.util";
import { formatFiatValue } from "../utils/Number.util";
import { PROJECT_KEY } from "../types/Project.type";
import { useGetProjectData } from "../api/Project.api";
import LoadingTableSkeleton from "./LoadingTableSkeleton";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  walletAddress: string;
  projectKey: PROJECT_KEY;
  setNetWorthMap: Dispatch<SetStateAction<NetWorthMap>>;
};

const ProjectCard = (props: Props) => {
  const { walletAddress, projectKey, setNetWorthMap } = props;

  const { data: projectData, isLoading } = useGetProjectData(
    walletAddress,
    projectKey
  );

  useEffect(() => {
    if (!isLoading && projectData) {
      setNetWorthMap((netWorthMap) => ({ ...netWorthMap, [projectKey]: projectData.fiatValue }));
    }
  }, [isLoading, projectData]);

  if (isLoading) {
    return <LoadingTableSkeleton />;
  }

  if (!projectData || projectData.error) {
    return null;
  }

  const { projectName, fiatValue, sections } = projectData || {};

  const getSectionDisplay = (section: Section) => {
    const { sectionName, fiatValue, headers, rows } = section;

    const rowComponents = rows.map((rowData) => getRowDisplay(rowData));

    return (
      <Box key={sectionName}>
        <SectionHeader>
          <SectionName>{sectionName}</SectionName>
          <SectionTotalValue>{formatFiatValue(fiatValue)}</SectionTotalValue>
        </SectionHeader>
        <CustomTable
          tableKey={`${section}-table`}
          headers={headers}
          rows={rowComponents}
        />
      </Box>
    );
  };

  return (
    <CardWrapper>
      <CardHeader>
        <ProjectHeader>{projectName}</ProjectHeader>
        <ProjectTotalValue>{formatFiatValue(fiatValue)}</ProjectTotalValue>
      </CardHeader>
      {sections && sections.map((section) => getSectionDisplay(section))}
    </CardWrapper>
  );
};

const SectionTotalValue = styled(Typography)({
  fontSize: "1rem",
  marginRight: "1rem",
  color: "#FFC600",
});

const SectionName = styled(Typography)({
  fontSize: "1rem",
  paddingLeft: "1rem",
  color: "#FFC600",
  fontWeight: "500",
});

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.5rem",
});

const CardWrapper = styled(CustomPaper)({
  paddingBottom: "1rem",
  marginBottom: "2rem",
});

const ProjectHeader = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const ProjectTotalValue = styled(TypographyNeon)({
  fontSize: "1.25rem",
});

const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
});

export default ProjectCard;
