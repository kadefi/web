import styled from "@emotion/styled";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { MouseEvent, useState } from "react";
import PngLogo from "./PngLogo";

type Props = {
  name: string;
  // module: string;
  socialLink: string;
  description?: string;
  image?: string;
};

const IntegrationPill = (props: Props) => {
  const {
    name,
    // module,
    socialLink,
    description,
    image,
  } = props;

  const [isSelected, setIsSelected] = useState(true);

  const checkBox = isSelected ? <DoneRoundedIcon /> : <CheckBoxOutlineBlankRoundedIcon />;

  const handleIntegrationToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  return (
    <Container isSelected={isSelected}>
      <LeftPill onClick={handleIntegrationToggle}>
        {checkBox}
        {image && <PngLogo src={image} size={1.5} />}
        <NameContainer>
          <ProjectName>{name}</ProjectName>
          {description && <ProjectDescription>{description}</ProjectDescription>}
        </NameContainer>
      </LeftPill>
      <SocialButton target="__blank" href={socialLink}>
        <OpenInNewRoundedIcon fontSize="small" sx={{ fill: "#9e9e9e" }} />
      </SocialButton>
    </Container>
  );
};

const LeftPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 0 1rem 1.5rem;
  flex-grow: 1;
`;

const ProjectDescription = styled.div`
  color: #9e9e9e;
  font-size: 12px;
`;

const ProjectName = styled.div`
  font-weight: 500;
  font-weight: 500;
  text-shadow: 0px 0px 3px #ff007f;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SocialButton = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
`;

type ContainerProps = {
  isSelected: boolean;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
  transition: 300ms;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  }
`;

export default IntegrationPill;
