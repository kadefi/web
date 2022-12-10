import styled from "@emotion/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MuiContainer from "@mui/material/Container";
import { GetStaticProps } from "next";
import { useState } from "react";
import { getIntegrationInfo } from "../../src/api/Integration.api";
import SnackBarAlert from "../../src/components/commons/SnackBarAlert";
import TypographyNeon from "../../src/components/commons/TypographyNeon";
import { getPageLayout } from "../../src/layouts/PageLayout";
import theme from "../../src/theme";
import { IntegrationInfo } from "../../src/types/DashboardData.type";

const DONATION = "k:9d46e06675aaaea9803c8baadf0d26b9f933ed85f58f086d2bb700266bad6a65";

type Props = {
  integrations: IntegrationInfo;
};

const Donate = (props: Props) => {
  const { integrations } = props;

  const [open, setOpen] = useState(false);

  const getStatDisplay = (value: number, title: string) => {
    return (
      <StatContainer>
        <TypographyNeon variant="h4">{value}</TypographyNeon>
        <div>{title}</div>
      </StatContainer>
    );
  };

  const { projects, nfts, tokens } = integrations;

  const handleWalletClick = () => {
    navigator.clipboard.writeText(DONATION);
    setOpen(true);
  };

  const alertClose = () => {
    setOpen(false);
  };

  const donationButton = (
    <DonateContainer onClick={handleWalletClick}>
      <DonationAddress>{DONATION}</DonationAddress>
      <ContentCopyIcon />
    </DonateContainer>
  );

  return (
    <Container maxWidth="md">
      <ContentContainer>
        <MainHeader>Donate to keep Kadefi.Money running</MainHeader>
        {donationButton}
        <div>👋 Hey there,</div>
        <div>
          We want to take a quick moment to say thank you for your love and support of our little app. Thanks to your
          encouragement, we&apos;re able to keep pushing forward and making Kadefi.Money the best that it can be. We
          have come a long way, and here is a little summary of the work that we have accomplished together thus far:
        </div>
        {getStatDisplay(projects, "Project integrations")}
        {getStatDisplay(tokens, "Tokens supported on Kadefi.Money dashboard")}
        {getStatDisplay(nfts, "NFT Collections integrated with your wallet")}
        {getStatDisplay(32, "Trading pairs with real-time price chart on DexScan")}
        <div>
          We are extremely happy whenever someone shares about our platform, and we want to continue providing the best
          possible experience. We have many ideas and we would want to continue building in Kadena ecosystem as long as
          we can. However, as the usage of the platform increases and the server cost begins to mount up, we need your
          help to keep the platform running.
        </div>
        <div>
          If you are feeling generous, a donation (no matter the amount) would be of great help to us to keep
          Kadefi.Money and DexScan running and new integrations going. As a token of appreciation, we would give you a
          big virtual hug 🤗 (not the real one though, we are not that kind of platform 😉)
        </div>
        <div>
          From the bottom of our hearts, we truly appreciate your support and we look forward to continuing serving you
          and the Kadena community in the future 🚀
        </div>
        <div>Sincerely,</div>
        <div>Kadefi.Money Founders</div>
      </ContentContainer>
      <SnackBarAlert isOpen={open} handleClose={alertClose} message="Copied Address to Clipboard" severity="success" />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const integrations = await getIntegrationInfo();

  return {
    props: {
      integrations,
    },
  };
};

const MainHeader = styled.h1`
  color: #ff007f;
  margin: 0;
  ${theme.breakpoints.down("md")} {
    font-size: 1.5rem;
  }
`;

const Container = styled(MuiContainer)`
  padding: 1rem 2rem;
`;

const DonateContainer = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  background: #ff007f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const DonationAddress = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: start;
  background-color: rgba(23, 0, 23, 0.8);
  padding: 2rem 3.5rem;
  border-radius: 5;
  ${theme.breakpoints.down("md")} {
    padding: 2rem;
  }
`;

const StatContainer = styled.div({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

Donate.getLayout = getPageLayout;

export default Donate;
