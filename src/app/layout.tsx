import "./global.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { GoogleTagManager } from "@next/third-parties/google";
import { Poppins } from "next/font/google";

import theme from "@/src/config/theme/Theme";
import CookieConsentComponent from "@/src/components/_Root/cookieConsent/CookieConsent";
import { SITE } from "@/src/lib/data/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: "%s" },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      data-mantine-color-scheme="light"
      className={poppins.variable}
    >
      <GoogleTagManager gtmId="GTM-PCWK4T4P" />
      <body className="font-sans">
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <CookieConsentComponent />
      </body>
    </html>
  );
}
