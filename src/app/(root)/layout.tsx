import "../global.css";
import "@mantine/core/styles.css";

import Header from "@/src/components/_Root/header/header";
import Footer from "@/src/components/_Root/footer/Footer";
import Transition from "@/src/components/_UI/Transition/Transition";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Transition>{children}</Transition>
      <Footer />
    </>
  );
}
