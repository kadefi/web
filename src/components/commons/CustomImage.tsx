import styled from "@emotion/styled";
import Image, { ImageProps } from "next/image";

const ImageWrap = styled.div`
  margin: 32px auto;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
  }
`;

const CustomImage = (props: ImageProps) => {
  return (
    <ImageWrap>
      <Image {...props} quality={70} />
    </ImageWrap>
  );
};

export default CustomImage;
