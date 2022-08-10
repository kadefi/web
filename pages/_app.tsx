import { CacheProvider, EmotionCache } from "@emotion/react";
import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import DesktopBackground from "../public/assets/desktop-background.svg";
import MobileBackground from "../public/assets/mobile-background.svg";
import { initializeAmplitude } from "../src/analytics/Analytics.util";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import { Page } from "../src/types/Page.type";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: Page;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

if (typeof window !== "undefined") {
  const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
    buster: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  });
}

initializeAmplitude();

const TITLE = "Kadefi Money | DeFi Dashboard for Kadena";
const DESCRIPTION = "Kadena Porfolio and Insights Dashboard. Track all your Kadena's investments on a single dashboard";
const IMAGE_URL = "https://kadefi.money/assets/logo.png";
const TWITTER_USERNAME = "@kadefi_money";

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>{TITLE}</title>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={IMAGE_URL} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={TWITTER_USERNAME} />
          <meta property="twitter:title" content={TITLE} />
          <meta property="twitter:description" content={DESCRIPTION} />
          <meta property="twitter:image" content={IMAGE_URL} />
        </Head>
        <Background>
          <Image
            alt="Background"
            src={isMobile ? MobileBackground : DesktopBackground}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </Background>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
`;
