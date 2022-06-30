import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UseQueryResult } from "react-query";
import theme from "../theme";
import { ProjectData, ProjectResponse, Section, TableRowData } from "../types/DashboardData.type";
import { getProjectLogo } from "../utils/Logo.util";
import { formatFiatValue } from "../utils/Number.util";
import { getRowDisplay } from "../utils/Table.util";
import CustomPaper from "./commons/CustomPaper";
import CustomTable from "./commons/CustomTable";
import TypographyNeon from "./commons/TypographyNeon";
import LoadingTableSkeleton from "./LoadingTableSkeleton";

type Props = {
  projectQuery: UseQueryResult<ProjectData>;
};

const getMobileTableDisplay = (headers: string[], rows: TableRowData[]) => {
  const tableHeaders = ["Details", ...headers.slice(-1)];

  const tableRowComponents = rows.map((row, i) => {
    const rowComponents = getRowDisplay(row);

    const detailRowComponents = rowComponents.slice(0, -1);

    const detailCell = (
      <div key={`detailRow-${i}`}>
        {detailRowComponents.map((detailRowComponent, j) => {
          return (
            <MobileDetailRowElement key={`detailRowCell-${j}`}>
              <MobileDetailRowHeader>{headers[j]}</MobileDetailRowHeader>
              {detailRowComponent}
            </MobileDetailRowElement>
          );
        })}
      </div>
    );

    const lastCell = <MobileLastCell>{rowComponents[rowComponents.length - 1]}</MobileLastCell>;

    return [detailCell, lastCell];
  });

  return { tableHeaders, tableRowComponents };
};

const getDesktopTableDisplay = (headers: string[], rows: TableRowData[]) => {
  const tableRowComponents = rows.map((rowData) => getRowDisplay(rowData));

  return { tableHeaders: headers, tableRowComponents };
};

const ProjectCard = (props: Props) => {
  const { projectQuery } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!projectQuery) {
    return null;
  }

  const { data: projectData, isLoading, isError } = projectQuery;

  if (isLoading) {
    return <LoadingTableSkeleton />;
  }

  if (!projectData || isError) {
    return null;
  }

  const projectResponse = projectData as ProjectResponse;
  const { projectName, module, fiatValue, sections } = projectResponse;

  const getSectionDisplay = (section: Section) => {
    const { sectionName, fiatValue, headers, rows } = section;

    const transformTableDisplay = isMobile ? getMobileTableDisplay : getDesktopTableDisplay;

    const { tableHeaders, tableRowComponents } = transformTableDisplay(headers, rows);

    return (
      <Box key={sectionName}>
        <SectionHeader>
          <SectionName>{sectionName}</SectionName>
          <SectionTotalValue>{formatFiatValue(fiatValue)}</SectionTotalValue>
        </SectionHeader>
        <CustomTable tableKey={`${section}-table`} headers={tableHeaders} rows={tableRowComponents} />
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

const MobileLastCell = styled.div`
  font-size: 0.8rem;
`;

const MobileDetailRowHeader = styled.div`
  font-weight: 400;
  color: #a3a3a3;
  font-size: 0.75rem;
  width: 3rem;
  white-space: pre-wrap;
`;

const MobileDetailRowElement = styled.div`
  margin-bottom: 8px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const SectionTotalValue = styled(Typography)({
  fontSize: "1rem",
  marginRight: "1rem",
  color: "#FFC600",

  [`{${theme.breakpoints.down("sm")}}`]: {
    fontSize: "0.9rem",
  },
});

const SectionName = styled(Typography)({
  fontSize: "1rem",
  paddingLeft: "1rem",
  color: "#FFC600",
  fontWeight: "700",

  [`${theme.breakpoints.down("sm")}`]: {
    fontSize: "0.9rem",
  },
});

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
  marginBottom: "0.5rem",
});

const CardWrapper = styled(CustomPaper)({
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

const ProjectTotalValue = styled(TypographyNeon)({
  fontSize: "1.25rem",

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
