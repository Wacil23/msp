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
