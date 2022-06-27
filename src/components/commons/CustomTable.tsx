import { styled } from "@mui/material/styles";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses, TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode, useMemo } from "react";
import theme from "../../theme";

type Props = {
  tableKey: string;
  headers: ReactNode[];
  rows: ReactNode[][];
};

const CustomTable = (props: Props) => {
  const { tableKey, headers, rows } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerTableCells = useMemo(() => {
    return headers.map((header, i) => {
      let align: TableCellProps["align"] = "left";

      if (i === headers.length - 1) {
        align = "right";
      }

      return (
        <StyledTableCell key={`${tableKey}-header-${i}`} align={align}>
          {header}
        </StyledTableCell>
      );
    });
  }, [tableKey, headers]);

  const tableRows = useMemo(() => {
    return rows.map((rowCells, i) => (
      <StyledTableRow key={`${tableKey}-row-${i}`}>
        {rowCells.map((rowCell, j) => {
          let align: TableCellProps["align"] = "left";

          // Change to <th> for first cell
          if (j === 0) {
            return (
              <StyledTableCell key={`${tableKey}-cell-${j}`} component="th" scope="row" align={align}>
                {rowCell}
              </StyledTableCell>
            );
          }

          // Align right only for the last cell
          if (j === rowCells.length - 1) {
            align = "right";
          }

          const style = {
            verticalAlign: isMobile ? "top" : "center",
          };

          return (
            <StyledTableCell key={`${tableKey}-cell-${j}`} align={align} style={style}>
              {rowCell}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    ));
  }, [tableKey, rows, isMobile]);

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

const StyledTableBody = styled(TableBody)({
  backgroundColor: "transparent",
  whiteSpace: "nowrap",
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "transparent",
  backgroundImage: "none",
  boxShadow: "none",
  borderRadius: 0,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(23, 0, 23, 0.8)",
    color: theme.palette.common.white,
    borderBottom: "none",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",

    [`${theme.breakpoints.down("sm")}`]: {
      fontSize: "0.75rem",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.875rem",
    borderBottom: "1px solid #512a53",
    padding: "0.5rem 1rem",

    [`${theme.breakpoints.down("sm")}`]: {
      fontSize: "0.75rem",
    },
  },
}));

const StyledTableRow = styled(TableRow)({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

export default CustomTable;
