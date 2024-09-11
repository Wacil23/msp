import "./global.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import theme from "@/src/config/theme/Theme";
import Providers from "@/src/utils/provider";
import LoadingManager from "../components/_UI/Loading/LoadingManager";
import { Notifications } from "@mantine/notifications";
import { GoogleTagManager } from "@next/third-parties/google";
import CookieConsentComponent from "../components/_Root/cookieConsent/CookieConsent";
import Head from "next/head";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-mantine-color-scheme="light">
      <GoogleTagManager gtmId="GTM-PCWK4T4P" />
      <Head>
        <link rel="preconnect" href="https://www.youtube.fr" />
        <link rel="preconnect" href="https://www.google.fr" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </Head>
      <body>
        <Providers>
          <LoadingManager>
            <MantineProvider theme={theme}>
              <Notifications />
              {children}
            </MantineProvider>
            <CookieConsentComponent />
          </LoadingManager>
        </Providers>
      </body>
    </html>
  );
}
