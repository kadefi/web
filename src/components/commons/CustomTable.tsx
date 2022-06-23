import { styled } from "@mui/material/styles";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses, TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode, useMemo } from "react";

type Props = {
  tableKey: string;
  headers: ReactNode[];
  rows: ReactNode[][];
};

const CustomTable = (props: Props) => {
  const { tableKey, headers, rows } = props;

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

          return (
            <StyledTableCell key={`${tableKey}-cell-${j}`} align={align}>
              {rowCell}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    ));
  }, [tableKey, rows]);

  return (
    <StyledTableContainer>
      <MuiTable size="small" aria-label="customized table">
        <TableHead>
          <TableRow>{headerTableCells}</TableRow>
        </TableHead>
        <StyledTableBody>{tableRows}</StyledTableBody>
      </MuiTable>
    </StyledTableContainer>
  );
};

const StyledTableBody = styled(TableBody)({
  backgroundColor: "transparent",
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
    fontWeight: "bold",
    padding: "0.5rem 1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "1px solid #3E193F",
    padding: "0.5rem 1rem",
  },
}));

const StyledTableRow = styled(TableRow)({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

export default CustomTable;
