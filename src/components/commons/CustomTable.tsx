import styled from "@emotion/styled";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses, TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode, useMemo, useState } from "react";
import _ from "underscore";
import theme from "../../theme";
import { transientOptions } from "../../utils/StyledComponent.util";
import ExpandedTableRow from "./ExpandedTableRow";

type Props = {
  tableKey: string;
  headers: ReactNode[];
  rows: ReactNode[][];
  expandedRows?: ReactNode[];
  isSubTable?: boolean;
  isWalletTable?: boolean;
};

const CustomTable = (props: Props) => {
  const { tableKey, headers, rows, expandedRows, isSubTable = false, isWalletTable } = props;

  const [expandedRowNumbers, setExpandedRowNumbers] = useState<number[]>([]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerTableCells = useMemo(() => {
    return headers.map((header, i) => {
      let align: TableCellProps["align"] = "left";

      if (i === headers.length - 1) {
        align = "right";
      }

      return (
        <StyledTableCell key={`${tableKey}-header-${i}`} align={align} $isSubTable={isSubTable}>
          {header}
        </StyledTableCell>
      );
    });
  }, [headers, tableKey, isSubTable]);

  const tableRows = useMemo(() => {
    const handleRowExpandToggle = (rowNumber: number) => {
      if (expandedRowNumbers.includes(rowNumber)) {
        setExpandedRowNumbers((expandedRowNumbers) => _.without(expandedRowNumbers, rowNumber));
      } else {
        setExpandedRowNumbers((expandedRowNumbers) => [...expandedRowNumbers, rowNumber]);
      }
    };

    const displayRows: ReactNode[] = [];

    rows.forEach((rowCells, rowNumber) => {
      const isExpanded = expandedRowNumbers.includes(rowNumber);
      const isExpandable = Boolean(expandedRows && expandedRows[rowNumber]);

      const handleRowClick = isExpandable ? () => handleRowExpandToggle(rowNumber) : () => {};

      displayRows.push(
        <StyledTableRow
          key={`${tableKey}-row-${rowNumber}`}
          onClick={handleRowClick}
          $isExpandable={isExpandable}
          $isSubTable={isSubTable}
        >
          {rowCells.map((rowCell, j) => {
            let align: TableCellProps["align"] = "left";

            // Change to <th> for first cell
            if (j === 0) {
              return (
                <StyledTableCell
                  key={`${tableKey}-cell-${j}`}
                  component="th"
                  scope="row"
                  align={align}
                  $isSubTable={isSubTable}
                  $isExpanded={isExpanded}
                >
                  {isExpandable ? (
                    <ExpandArrowContainer>
                      <ExpandArrow $isExpanded={isExpanded} />
                      {rowCell}
                    </ExpandArrowContainer>
                  ) : (
                    rowCell
                  )}
                </StyledTableCell>
              );
            }

            // Align right only for the last cell
            if (j === rowCells.length - 1) {
              align = "right";
            }

            const style = {
              verticalAlign: !isMobile || isWalletTable ? "center" : "top",
            };

            return (
              <StyledTableCell
                key={`${tableKey}-cell-${j}`}
                align={align}
                style={style}
                $isSubTable={isSubTable}
                $isExpanded={isExpanded}
              >
                {rowCell}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>,
      );

      if (isExpandable && expandedRows && expandedRows[rowNumber]) {
        displayRows.push(
          <ExpandedTableRow
            key={`${tableKey}-expanded-row-${rowNumber}`}
            isExpanded={isExpanded}
            colNums={rowCells.length}
          >
            {expandedRows[rowNumber]}
          </ExpandedTableRow>,
        );
      }
    });

    return displayRows;
  }, [rows, expandedRowNumbers, expandedRows, tableKey, isMobile, isSubTable, isWalletTable]);

  const tableContent = tableRows.length === 0 ? <EmptyTable length={headerTableCells.length} /> : tableRows;
  return (
    <StyledTableContainer>
      <MuiTable size="small" aria-label="customized table">
        <TableHead>
          <TableRow>{headerTableCells}</TableRow>
        </TableHead>
        <StyledTableBody>{tableContent}</StyledTableBody>
      </MuiTable>
    </StyledTableContainer>
  );
};

type EmptyTableProps = {
  length: number;
};

const EmptyTable = ({ length }: EmptyTableProps) => (
  <StyledTableRow>
    <StyledTableCell style={{ height: "200px" }} colSpan={length} component="td" scope="row" align="center">
      Your wallet is empty
    </StyledTableCell>
  </StyledTableRow>
);

const StyledTableBody = styled(TableBody)`
  background-color: transparent;
  white-space: nowrap;

  tr:nth-of-type(1) {
    border-top: none;
  }
`;

const ExpandArrowContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -0.5rem;
`;

type ExpandArrowProps = {
  $isExpanded: boolean;
};

const ExpandArrow = styled(ChevronRightTwoToneIcon, transientOptions)<ExpandArrowProps>`
  color: gray;
  transition: transform 300ms;
  transform: ${(props) => (props.$isExpanded ? "rotate(90deg)" : "rotate(0deg)")};
`;

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "transparent",
  backgroundImage: "none",
  boxShadow: "none",
  borderRadius: 0,
});

type StyledTableCellProps = {
  $isExpanded?: boolean;
  $isSubTable?: boolean;
};

const StyledTableCell = styled(TableCell, transientOptions)<StyledTableCellProps>`
  font-size: ${(props) => (props.$isSubTable ? "0.75rem" : "0.875rem")};
  color: ${(props) => (props.$isSubTable ? "#cccccc" : "white")};

  ${theme.breakpoints.down("sm")} {
    font-size: ${(props) => (props.$isSubTable ? "0.7rem" : "0.75rem")};
  }

  &.${tableCellClasses.head} {
    background-color: ${(props) => (props.$isSubTable ? "rgba(0, 0, 0, 0.2)" : "rgba(23, 0, 23, 0.8)")};
    font-weight: ${(props) => (props.$isSubTable ? "700" : "500")};
    border: none;
    padding: 0.5rem 1rem;
  }

  &.${tableCellClasses.body} {
    text-shadow: ${(props) => (props.$isExpanded ? "0px 0px 10px #FF007F" : "none")};
    font-weight: ${(props) => (props.$isExpanded ? "500" : "400")};
    border: none;
    padding: 0.5rem 1rem;
  }
`;

type StyledTableRowProps = {
  $isSubTable?: boolean;
  $isExpandable?: boolean;
};

const StyledTableRow = styled(TableRow, transientOptions)<StyledTableRowProps>`
  transition: background 300ms;
  cursor: ${(props) => (props.$isExpandable ? "pointer" : "default")};
  border-top: ${(props) => (props.$isSubTable ? "1px dotted #322232" : "1px solid #512a53")}; ;
`;

export default CustomTable;
