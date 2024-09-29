import {
  deleteMeetingDirectus,
  deleteZoomMeeting,
} from "@/src/app/(dashboard)/dashboard/reunion/reunion-action";
import { PayloadDirectusMeeting } from "@/src/models/zoom/Zoom.model";
import { UserSession } from "@/types/next-auth";
import { Avatar, Badge, Modal, Table, Tooltip } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useMeetingContext } from "@/src/lib/providers/useMeetingProvider";
import { notifications } from "@mantine/notifications";
import { CgCheck } from "react-icons/cg";
import { useUserContextProvider } from "@/src/lib/providers/useUserProvider";

interface ModifiedMeetingInvitees {
  directus_users_id: UserSession;
}

export interface ModifiedPayloadDirectusMeeting
  extends Omit<PayloadDirectusMeeting, "meeting_invitees" | "id"> {
  id: string;
  idZoom: number;
  meeting_invitees: ModifiedMeetingInvitees[];
}

interface MeetingTableProps {
  meetings: ModifiedPayloadDirectusMeeting[] | null;
}

const MeetingTable: React.FC<MeetingTableProps> = ({ meetings }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [meeting, setMeeting] = useState<ModifiedPayloadDirectusMeeting | null>(
    null,
  );
  const { fetchMeetings } = useMeetingContext();
  const { isAdmin } = useUserContextProvider();
  const tokenZoom = localStorage.getItem("zoom_access_token");
  const { data: tokenDirectus } = useSession();

  async function handleDeleteMeeting(
    event: React.MouseEvent<SVGElement, MouseEvent>,
    meeting_id: string,
    zoom_id: number,
  ) {
    event.stopPropagation();
    if (tokenZoom && tokenDirectus?.acess_token) {
      notifications.show({
        message: "Votre réunion est en cours de suppression",
        title: "En cours de suppression",
        loading: true,
        id: "deleteMeeting",
        color: "orange",
        position: "top-center",
      });
      try {
        await deleteZoomMeeting(zoom_id, tokenZoom);
        await deleteMeetingDirectus(tokenDirectus?.acess_token, meeting_id);
        fetchMeetings();
        notifications.update({
          message: "Votre réunion a bien été supprimé",
          title: "Réunion supprimée !",
          icon: <CgCheck color="black" />,
          id: "deleteMeeting",
          loading: false,
          position: "top-center",
          color: "green",
        });
      } catch (e) {}
    }
  }

  const rows = meetings?.map((row) => {
    const {
      duration,
      start_date,
      start_time,
      meeting_invitees,
      id,
      title,
      zoom_id,
    } = row;
    const splittingTime = start_time.split(":");
    const time = splittingTime[0] + "h" + splittingTime[1];
    const avatarComponents = [];

    meeting_invitees.slice(0, 3).forEach(({ directus_users_id: user }) => {
      const fullName = `${user.first_name} ${user.last_name}`;
      avatarComponents.push(
        <Tooltip label={fullName}>
          <Avatar name={fullName} size="sm" color="blue" />
        </Tooltip>,
      );
    });

    if (meeting_invitees.length > 3) {
      const extraCount = meeting_invitees.length - 3;
      const remainingNames = meeting_invitees
        .slice(3)
        .map(
          ({ directus_users_id: user }) =>
            `${user.first_name} ${user.last_name}`,
        )
        .join("<br />");

      avatarComponents.push(
        <Tooltip
          label={<div dangerouslySetInnerHTML={{ __html: remainingNames }} />}
        >
          <Avatar
            name={remainingNames}
            size="sm"
            color="green"
            children={`+${extraCount}`}
          />
        </Tooltip>,
      );
    }

    const openModal = (id: string) => {
      open();
      const currentMeeting = meetings.find((meeting) => meeting.id === id);
      currentMeeting && setMeeting(currentMeeting);
    };

    return (
      <Table.Tr
        onClick={() => openModal(id)}
        className="cursor-pointer font-medium"
        key={id}
      >
        <Table.Td>{title}</Table.Td>
        <Table.Td>{start_date}</Table.Td>
        <Table.Td>{time}</Table.Td>
        <Table.Td>
          <Badge color="green">{duration} min</Badge>
        </Table.Td>
        <Table.Td key={title} className="flex items-center gap-2">
          {avatarComponents}
        </Table.Td>
        {isAdmin && (
          <Table.Td>
            <BiTrash
              color="red"
              onClick={(e) => handleDeleteMeeting(e, id, zoom_id)}
              size={20}
              className="cursor-pointer self-end"
            />
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  const ths = (
    <Table.Tr>
      <Table.Th>Titre</Table.Th>
      <Table.Th>Date</Table.Th>
      <Table.Th>Heure</Table.Th>
      <Table.Th>Durée</Table.Th>
      <Table.Th>Participants</Table.Th>
      {isAdmin && <Table.Th>Actions</Table.Th>}
    </Table.Tr>
  );
  const year = new Date(meeting?.start_date!).getFullYear();
  const month = new Date(meeting?.start_date!).getMonth() + 1;
  const day = new Date(meeting?.start_date!).getDate();
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

  return (
    <>
      {meetings && meetings?.length > 0 ? (
        <Table striped highlightOnHover>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>

          <Modal
            centered
            title={meeting?.title}
            key={meeting?.id}
            opened={opened}
            onClose={close}
          >
            <div>
              <p>{meeting?.id}</p>
              <p className="text-sm font-medium">
                Date de début :
                <span>{`${day} ${frenchMonth[month]} ${year}`}</span>
              </p>
              <p className="text-sm font-medium">
                Durée : <span> {meeting?.duration ?? ""} minutes</span>
              </p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-sm font-medium">Participant :</p>
              <ul className="flex flex-col justify-start">
                {meeting?.meeting_invitees.map(
                  ({ directus_users_id: user }) => (
                    <li className="py-1">
                      <Tooltip label={user.email} position="right">
                        <p className="w-fit cursor-pointer px-2 text-sm font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                      </Tooltip>
                    </li>
                  ),
                )}
              </ul>
              <p>
                Lien de l'url :
                <a
                  href={meeting?.join_url}
                  className="cursor-pointer text-blue-600 underline underline-offset-1"
                >
                  {meeting?.join_url}
                </a>
              </p>
              {meeting?.description && <p>{meeting.description}</p>}
            </div>
          </Modal>
        </Table>
      ) : (
        <p className="mx-auto text-base font-medium text-red-600">
          Aucune réunion.
        </p>
      )}
    </>
  );
};

const GetZoomMeeting = () => {
  const { meetings } = useMeetingContext();
  return (
    <div className="my-8 flex flex-col justify-end">
      <MeetingTable
        meetings={meetings as unknown as ModifiedPayloadDirectusMeeting[]}
      />
    </div>
  );
};

export default GetZoomMeeting;
