import "./global.css";
import { MantineProvider } from "@mantine/core";
import Header from "@/lib/components/Header/Header";
import "@mantine/core/styles.css";
import theme from "@/lib/config/theme//Theme";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-mantine-color-scheme="light">
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
