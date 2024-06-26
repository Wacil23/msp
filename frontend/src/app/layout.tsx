import "./global.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import theme from "@/src/config/theme/Theme";
import Providers from "@/src/utils/provider";
import LoadingManager from "../components/_UI/Loading/LoadingManager";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-mantine-color-scheme="light">
      <head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="ebb3e4a4-f896-481e-88dd-88e6a54d26e2"
          type="text/javascript"
        ></script>
      </head>
      <body>
        <Providers>
          <LoadingManager>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </LoadingManager>
        </Providers>
      </body>
    </html>
  );
}
