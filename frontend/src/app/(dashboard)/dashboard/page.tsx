"use client";
import { useUserContextProvider } from "@/src/lib/providers/useUserProvider";
import { Badge } from "@mantine/core";

const ADMIN_ROLE = process.env.NEXT_PUBLIC_ADMIN_ROLE;
const Dashboard = () => {
  const { me } = useUserContextProvider();
  const year = new Date(me?.last_access!).getFullYear();
  const month = new Date(me?.last_access!).getMonth() + 1;
  const day = new Date(me?.last_access!).getDate();
  const frenchMonth: { [key: number]: string } = {
    1: "Janvier",
    2: "Février",
    3: "Mars",
    4: "Avril",
    5: "Mai",
    6: "Juin",
    7: "Juillet",
    8: "Août",
    9: "Septembre",
    10: "Octobre",
    11: "Novembre",
    12: "Décembre",
  };
  const isAdmin = me?.role === ADMIN_ROLE;
  return (
    <div className="w-full p-12">
      <div className="flex items-center justify-between rounded-2xl bg-primary px-6 py-12">
        <div className="flex flex-col">
          <p className="mb-2 text-xl font-medium">
            Bienvenue {me?.first_name} {me?.last_name}
          </p>
          <p className="text-sm">
            Dernière connection : {day} {frenchMonth[month]} {year}
          </p>
          <p className="text-sm">
            Rôle :{" "}
            <Badge size="sm" color="green">
              {isAdmin ? "Administrateur" : "Membre de la MSP"}
            </Badge>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
