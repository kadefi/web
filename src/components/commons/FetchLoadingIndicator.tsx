import styled from "@emotion/styled";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

const FetchLoadingIndicator = () => {
  return <LoadingIndicator width={20} height={20} />;
};

const LoadingIndicator = styled(AutorenewRoundedIcon)`
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  color: gray;
  animation: rotating 1s linear infinite;
`;

export default FetchLoadingIndicator;
