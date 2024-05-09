import "../global.css";
import Header from "@/src/components/_Root/header/header";
import "@mantine/core/styles.css";
import { getServerSession } from "next-auth";
import { UserAuthenticated } from "@/types/next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Footer from "@/src/components/_Root/footer/Footer";
import { motion } from "framer-motion";
import Transition from "@/src/components/_UI/Transition/Transition";

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
      <Transition>{children}</Transition>
      <Footer />
    </>
  );
}
