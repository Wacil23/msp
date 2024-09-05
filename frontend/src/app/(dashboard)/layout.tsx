import Sidebar from "@/src/components/_Dashboard/sidebar/sidebar";
import { UserAuthenticated } from "@/types/next-auth";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Notifications, notifications } from "@mantine/notifications";
import { UnreadMessagesProvider } from "@/src/lib/providers/useMessagesUnreadContext";

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
  const session = await getServerSession(options);
  const user = session?.user as UserAuthenticated;
  if (session?.expires) {
    notifications.show({
      title: "Vous avez été déconnecté",
      message:
        "Vous serez déconnecté dans 5 secondes. Veuillez vous reconnecter pour pouvoir continuer",
      autoClose: 5,
      color: "red",
    });
  }
  return (
    <UnreadMessagesProvider>
      <Sidebar children={children} />
    </UnreadMessagesProvider>
  );
}
