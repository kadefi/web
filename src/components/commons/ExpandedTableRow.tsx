import styled from "@emotion/styled";
import { TableRow, TableCell } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  isExpanded: boolean;
  colNums: number;
  children: ReactNode;
};

const ExpandedTableRow = (props: Props) => {
  const { isExpanded, colNums, children } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.scrollHeight);
    }
  }, [ref]);

  return (
    <ExpandedContentRow>
      <ExpandedTableCell colSpan={colNums}>
        <ExpandedContent ref={ref} isExpanded={isExpanded} contentHeight={contentHeight}>
          {children}
        </ExpandedContent>
      </ExpandedTableCell>
    </ExpandedContentRow>
  );
};

const ExpandedContentRow = styled(TableRow)`
  border: 0;
`;

type ExpandedContentProps = {
  isExpanded: boolean;
  contentHeight: number;
};

const ExpandedContent = styled.div<ExpandedContentProps>`
  transition: height 300ms, padding-top 300ms, padding-bottom 300ms;
  height: ${(props) => (props.isExpanded ? `${props.contentHeight + 24}px` : "0")};
  padding-top: ${(props) => (props.isExpanded ? `8px` : "0")};
  padding-bottom: ${(props) => (props.isExpanded ? `16px` : "0")};
  overflow: hidden;
  border: 0;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ExpandedTableCell = styled(TableCell)`
  padding: 0;
  border: 0;
  color: #d3d3d3;
  font-size: 0.75rem;
`;

export default ExpandedTableRow;
