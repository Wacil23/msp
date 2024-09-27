import { UserSession } from "@/types/next-auth";
import { Badge } from "@mantine/core";
import { FiMapPin } from "react-icons/fi";

type TeamsProps = {
  users?: UserSession[];
};

const Teams: React.FC<TeamsProps> = ({ users }) => {
  return (
    <div className="flex flex-col text-darker">
      <div className="mx-4 flex flex-col gap-4 overflow-hidden rounded-2xl bg-primary px-4 py-10 transition-all md:mx-8 md:px-12 md:py-14 lg:gap-12">
        <h2 className="text-2xl font-normal lg:text-4xl">L'équipe de la MSP</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users
            ?.sort((a, b) => a.last_name!.localeCompare(b.last_name!))
            .map((user) => (
              <>
                <div className="group relative flex flex-col gap-7 rounded-2xl bg-white p-6 shadow-primary/40 transition-all duration-300 hover:-translate-y-3 hover:bg-darker hover:shadow-md">
                  <Badge className="self-center" color="primary.1">
                    <span className="text-darker">{user.profession}</span>
                  </Badge>
                  <div className="flex flex-col gap-2 self-center text-darker group-hover:text-primary">
                    <p className="text-center font-normal">
                      {user.civility} {user.last_name?.toUpperCase()}{" "}
                      {user.first_name}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location!)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center gap-3 text-sm font-normal underline"
                    >
                      <FiMapPin />
                      {user.location}
                    </a>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
