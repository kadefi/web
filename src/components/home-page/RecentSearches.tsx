import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CustomLink from "../../commons/CustomLink";
import { ROUTE } from "../../constants/Routes.constant";
import theme from "../../theme";
import { getRecentWalletsLS } from "../../utils/LocalStorage.util";
import { shortenWalletAddress } from "../../utils/String.util";

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
      <Typography fontSize="14px">Recent Searches</Typography>
      <RecentSearchesWallets>
        {wallets.map((wallet, i) => (
          <div key={`recent-searches-${i}`}>
            <WalletPill href={`${ROUTE.DASHBOARD}/${wallet}`}>{shortenWalletAddress(wallet)}</WalletPill>
          </div>
        ))}
      </RecentSearchesWallets>
    </Container>
  );
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

  ${theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

const RecentSearchesWallets = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  ${theme.breakpoints.down("sm")} {
    justify-content: center;
  }
`;

export default RecentSearches;
