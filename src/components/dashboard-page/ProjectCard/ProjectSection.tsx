import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import CustomTable from "../../../commons/Table/CustomTable";
import theme from "../../../theme";
import { Section, TableRowData } from "../../../types/DashboardData.type";
import { formatFiatValue } from "../../../utils/Number.util";
import { getRowDisplay } from "../../../utils/Table.util";

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

type Props = {
  section: Section;
  isMobile: boolean;
};

const ProjectSection = (props: Props) => {
  const { section, isMobile } = props;

  const { sectionName, fiatValue, headers, rows } = section;

  const transformTableDisplay = isMobile ? getMobileTableDisplay : getDesktopTableDisplay;

  const { tableHeaders, tableRowComponents } = transformTableDisplay(headers, rows);

  return (
    <div key={sectionName}>
      <SectionHeader>
        <SectionName>{sectionName}</SectionName>
        <SectionTotalValue>{formatFiatValue(fiatValue)}</SectionTotalValue>
      </SectionHeader>
      <CustomTable tableKey={`${section}-table`} headers={tableHeaders} rows={tableRowComponents} />
    </div>
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
`;

const MobileDetailRowElement = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SectionTotalValue = styled(Typography)({
  fontSize: "14px",
  marginRight: "1rem",
  color: "#FFC600",
  fontWeight: "500",

  [`{${theme.breakpoints.down("sm")}}`]: {
    fontSize: "0.9rem",
  },
});

const SectionName = styled(Typography)({
  fontSize: "14px",
  paddingLeft: "1rem",
  color: "#FFC600",
  fontWeight: "500",

  [`${theme.breakpoints.down("sm")}`]: {
    fontSize: "0.9rem",
  },
});

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "0.5rem",
});

export default ProjectSection;
