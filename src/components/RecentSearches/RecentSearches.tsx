import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ROUTE } from "../../constants/Routes.constant";
import { getRecentWalletsLS } from "../../utils/LocalStorage.util";
import CustomLink from "../commons/CustomLink";

const RecentSearches = () => {
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    setWallets(getRecentWalletsLS());
  }, []);

  if (wallets.length === 0) {
    return null;
  }

  return (
    <Container>
      <Typography fontSize="12px">Recent Searches</Typography>
      <RecentSearchesWallets>
        {wallets.map((wallet, i) => (
          <div key={`recent-searches-${i}`}>{getWalletPill(wallet)}</div>
        ))}
      </RecentSearchesWallets>
    </Container>
  );
};

const getWalletPill = (wallet: string) => {
  let shortenedWallet = wallet;

  if (wallet.length > 11) {
    shortenedWallet = `${wallet.slice(0, 7)}...${wallet.slice(-4)}`;
  }

  return <WalletPill href={`${ROUTE.DASHBOARD}/${wallet}`}>{shortenedWallet}</WalletPill>;
};

const WalletPill = styled(CustomLink)`
  padding: 4px 8px;
  border-radius: 16px;
  background: rgba(255, 0, 127, 0.3);
  text-decoration: none;
  color: inherit;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 14px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const RecentSearchesWallets = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export default RecentSearches;
