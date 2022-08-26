import styled from "@emotion/styled";
import TwitterIcon from "@mui/icons-material/Twitter";
import PngLogo from "../../../commons/PngLogo";
import theme from "../../../theme";
import { MENU_CONFIG } from "./Menu.config";
import MenuButtons from "./MenuButtons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SideBar = (props: Props) => {
  const { isOpen, onClose } = props;

  return (
    <SideBarContainer isOpen={isOpen} numMenuItems={MENU_CONFIG.length}>
      <MenuButtons onClose={onClose} />
      <SidebarFooter>
        <SocialIcons>
          <TwitterContainer target="__blank" href="https://twitter.com/kadefi_money/">
            <div>Talk to us on</div>
            <TwitterIcon fontSize="small" />
          </TwitterContainer>
        </SocialIcons>
        <FluxAttribution href="https://runonflux.io/" target="_blank" rel="noreferrer">
          {`Powered by `}
          <PngLogo src="/assets/tokens/FLUX.png" size={1.5} quality={50} />
          Flux
        </FluxAttribution>
        <CopyrightText>Copyright © 2022 Kadefi.money. All rights reserved.</CopyrightText>
      </SidebarFooter>
    </SideBarContainer>
  );
};

type SideBarContainerProps = {
  isOpen?: boolean;
  numMenuItems: number;
};

const SideBarContainer = styled.div<SideBarContainerProps>`
  width: ${(props) => (props.isOpen ? "17rem" : "0px")};
  padding: 2rem ${(props) => (props.isOpen ? "1rem" : "0px")};
  padding-bottom: 1rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.246) 100%);
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${theme.breakpoints.down("md")} {
    transition: height 0.5s, padding 0.5s;
    position: absolute;
    background: #270024;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    height: ${(props) => (props.isOpen ? `${props.numMenuItems * 4 + 6.5}rem` : "0px")};
    width: 100vw;
    padding: ${(props) => (props.isOpen ? "1rem" : "0px")} 1rem;
  }
`;

const CopyrightText = styled.p`
  font-size: 8px;
  margin-top: 0px;
  text-align: center;
  ${theme.breakpoints.down("md")} {
    text-align: left;
    padding-left: 1rem;
  }
`;

const TwitterContainer = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  gap: 8px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  color: #a1a1a1;
  font-size: 0.875rem;
  gap: 8px;

  ${theme.breakpoints.down("md")} {
    justify-content: flex-start;
    padding-left: 1rem;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  color: #a1a1a1;
`;

const FluxAttribution = styled.a`
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: center;
  position: relative;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  border-top: 0.5px dotted #5b5b5b;
  padding-top: 1rem;
  color: inherit;

  ${theme.breakpoints.down("md")} {
    justify-content: flex-start;
    padding-left: 1rem;
  }
`;

export default SideBar;
