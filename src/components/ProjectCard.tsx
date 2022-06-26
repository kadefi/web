import { Box, Typography } from "@mui/material";
import TypographyNeon from "./commons/TypographyNeon";
import { styled } from "@mui/material/styles";
import CustomPaper from "./commons/CustomPaper";
import CustomTable from "./commons/CustomTable";
import { ProjectData, ProjectResponse, Section } from "../types/DashboardData.type";
import { getRowDisplay } from "../utils/Table.util";
import { formatFiatValue } from "../utils/Number.util";
import LoadingTableSkeleton from "./LoadingTableSkeleton";
import { UseQueryResult } from "react-query";
import { getProjectLogo } from "../utils/Logo.util";

type Props = {
  projectQuery: UseQueryResult<ProjectData>;
};

const ProjectCard = (props: Props) => {
  const { projectQuery } = props;

  if (!projectQuery) return null;

  const { data: projectData, isLoading, isError } = projectQuery;

  if (isLoading) return <LoadingTableSkeleton />;
  if (!projectData || isError) return null;

  const projectResponse = projectData as ProjectResponse;
  const { projectName, module, fiatValue, sections } = projectResponse;

  const getSectionDisplay = (section: Section) => {
    const { sectionName, fiatValue, headers, rows } = section;

    const rowComponents = rows.map((rowData) => getRowDisplay(rowData));

    return (
      <Box key={sectionName}>
        <SectionHeader>
          <SectionName>{sectionName}</SectionName>
          <SectionTotalValue>{formatFiatValue(fiatValue)}</SectionTotalValue>
        </SectionHeader>
        <CustomTable tableKey={`${section}-table`} headers={headers} rows={rowComponents} />
      </Box>
    );
  };

  return (
    <CardWrapper>
      <CardHeader>
        <ProjectHeader>
          {getProjectLogo(module)}
          {projectName}
        </ProjectHeader>
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
  marginTop: "1.5rem",
  marginBottom: "0.5rem",
});

const CardWrapper = styled(CustomPaper)({
  paddingBottom: "1rem",
  marginBottom: "2rem",
});

const ProjectHeader = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const ProjectTotalValue = styled(TypographyNeon)({
  fontSize: "1.25rem",
});

const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "1rem",
  margin: "0 1rem 1rem 1rem",
});

export default ProjectCard;
