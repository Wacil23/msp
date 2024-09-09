import Sidebar from "@/src/components/_Dashboard/sidebar/sidebar";
import { UnreadMessagesProvider } from "@/src/lib/providers/useMessagesUnreadContext";
import { UserContextProvider } from "@/src/lib/providers/useUserProvider";

export const metadata = {
  title: "Espace membre | MSP Denain",
  description:
    "Gérez vos documents, rendez-vous, réunions et bien plus encore...",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <UnreadMessagesProvider>
        <Sidebar children={children} />
      </UnreadMessagesProvider>
    </UserContextProvider>
  );
}
