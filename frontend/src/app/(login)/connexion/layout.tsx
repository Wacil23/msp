import Providers from "@/src/utils/provider";
import { MantineProvider } from "@mantine/core";
import React from "react";
import theme from "@/src/config/theme/Theme";
import "../../global.css";
import "@mantine/core/styles.css";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-mantine-color-scheme="light">
      <body>
        <Providers>
          <MantineProvider theme={theme}>
            <main>{children}</main>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
