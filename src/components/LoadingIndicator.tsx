import styled from "@emotion/styled";

type Props = {
  width?: string;
};

const LoadingIndicator = (props: Props) => {
  const { width } = props;

  return (
    <StyledObject
      width={width}
      type="image/svg+xml"
      data="/assets/loading-indicator.svg"
    />
  );
};

export default LoadingIndicator;

type StyledObjectProps = {
  width?: string;
};

const StyledObject = styled.object<StyledObjectProps>`
  width: ${(props) => props.width || "100px"};
  display: flex;
  justify-content: center;
`;
