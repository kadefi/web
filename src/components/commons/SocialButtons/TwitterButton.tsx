import styled from "@emotion/styled";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useMediaQuery } from "@mui/material";

const TwitterButton = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Container target="__blank" href="https://twitter.com/kadefi_money/" isMobile={isMobile}>
      <TwitterIcon fontSize="small" />
      {isMobile ? null : "Follow Us"}
    </Container>
  );
};

type ContainerProps = {
  isMobile: boolean;
};

const Container = styled.a<ContainerProps>`
  background-color: #ff007f;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  padding: ${(props) => (props.isMobile ? "8px" : "8px 16px")};
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

export default TwitterButton;
