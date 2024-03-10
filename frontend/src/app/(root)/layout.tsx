import "../global.css";
import { MantineProvider } from "@mantine/core";
import Header from "@/src/components/header/header";
import "@mantine/core/styles.css";
import theme from "@/src/config/theme/Theme";
import Providers from "@/src/utils/provider";
import { getServerSession } from "next-auth";
import { UserAuthenticated } from "@/types/next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const user = session?.user as UserAuthenticated;
  return (
    <html data-mantine-color-scheme="light">
      <body>
        <Providers>
          <MantineProvider theme={theme}>
            <Header user={user} />
            <main>{children}</main>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
