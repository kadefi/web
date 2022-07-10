import styled from "@emotion/styled";
import TwitterIcon from "@mui/icons-material/Twitter";
import theme from "../../../theme";

type Props = {
  isLogoOnly?: boolean;
  subtext?: string;
};

const TwitterButton = (props: Props) => {
  const { isLogoOnly = false, subtext = "Follow Us" } = props;

  if (isLogoOnly) {
    return <TwitterIcon fontSize="small" />;
  }

  return (
    <Container target="__blank" href="https://twitter.com/kadefi_money/">
      <TwitterIcon fontSize="small" />
      <Subtext>{subtext}</Subtext>
    </Container>
  );
};

const Subtext = styled.div`
  ${theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const Container = styled.a`
  background-color: #ff007f;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  ${theme.breakpoints.down("sm")} {
    padding: 8px;
  }
`;

export default TwitterButton;
