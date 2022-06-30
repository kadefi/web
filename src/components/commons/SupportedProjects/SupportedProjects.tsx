import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { TOKEN_TICKER } from "../../../types/Project.type";
import { getTokenLogo } from "../../../utils/Logo.util";

const SupportedProjects = () => {
  return (
    <Container>
      <Typography variant="subtitle2" mb="0.5rem">
        Supported Projects & Tokens:
      </Typography>
      <ProjectLogos>{Object.values(TOKEN_TICKER).map((token) => getTokenLogo(token))}</ProjectLogos>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProjectLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export default SupportedProjects;
