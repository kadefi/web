import styled from "@emotion/styled";
import { Skeleton, Typography } from "@mui/material";
import { useProjectsList } from "../../hooks/useProjectsList";
import { getTokenLogo } from "../../utils/Logo.util";

const SupportedProjects = () => {
  const { projectsList } = useProjectsList();

  let projectLogos = null;
  if (projectsList) {
    projectLogos = projectsList.map((project) => getTokenLogo(project.image, `${project.module}-supported`));
  }

  return (
    <Container>
      <Typography variant="subtitle2" mb="0.5rem">
        Supported Projects:
      </Typography>
      <ProjectLogos>{projectsList ? projectLogos : <LoadingSkeleton variant="rectangular" />}</ProjectLogos>
    </Container>
  );
};

const LoadingSkeleton = styled(Skeleton)`
  height: 1.5rem;
  width: 10rem;
  border-radius: 8px;
`;

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
