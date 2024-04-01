import "./global.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import theme from "@/src/config/theme/Theme";
import Providers from "@/src/utils/provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-mantine-color-scheme="light">
      <body>
        <Providers>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
