import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoadingTableSkeleton = () => {
  return <StyledSkeleton variant="rectangular" />;
};

const StyledSkeleton = styled(Skeleton)({
  height: "15rem",
  marginBottom: "2rem",
  borderRadius: "4px",
});

export default LoadingTableSkeleton;
