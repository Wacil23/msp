import "../global.css";
import { MantineProvider } from "@mantine/core";
import Header from "@/src/components/_Root/header/header";
import "@mantine/core/styles.css";
import theme from "@/src/config/theme/Theme";
import Providers from "@/src/utils/provider";
import { getServerSession } from "next-auth";
import { UserAuthenticated } from "@/types/next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Footer from "@/src/components/_Root/footer/Footer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const user = session?.user as UserAuthenticated;
  return (
    <>
      <Header user={user} />
      <main className="bg-main md:px-36 md:pt-10 md:pb-32 min-h-dvh">
        {children}
      </main>
      <Footer />
    </>
  );
}
