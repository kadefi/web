import styled from "@emotion/styled";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

type Props = {
  text?: string;
};

const FetchLoadingIndicator = (props: Props) => {
  const { text } = props;

  return (
    <Container>
      <LoadingIndicator width={20} height={20} />
      {text}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: gray;
  font-size: 12px;
  font-weight: 400;
  text-shadow: none;
`;

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
