import "@mantine/dates/styles.css";
import {
  Button,
  Checkbox,
  Modal,
  MultiSelect,
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";
import { useForm, UseFormReturnType, yupResolver } from "@mantine/form";
import { CgCalendarDates, CgCheck } from "react-icons/cg";
import { PiPen } from "react-icons/pi";
import { useWindowSize } from "../../../lib/hooks/window/useWindowSize";
import {
  combineDateAndTime,
  getInitialDateStart,
  getInitialStartTime,
  getParisCurrentDate,
} from "@/src/utils/func/FormatDatesForm";
import { UserSession } from "../../../../types/next-auth";
import { useState } from "react";
import {
  postDirectusMeeting,
  postZoomMeeting,
} from "@/src/app/(dashboard)/dashboard/reunion/reunion-action";
import {
  PayloadDirectusMeeting,
  ZoomForm,
  ZoomPayload,
} from "@/src/models/zoom/Zoom.model";
import { getSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { ZoomMeetingValidation } from "@/src/config/validations/ZoomMeeting";
import { useUserContextProvider } from "@/src/lib/providers/useUserProvider";

interface CreateZoomProps {
  opened: boolean;
  close: () => void;
  users: UserSession[];
}

const CreateZoomMeeting: React.FC<CreateZoomProps> = (props) => {
  const { opened, close, users } = props;
  const isMobile = useWindowSize().width <= 768;
  const isTabled = useWindowSize().width <= 1024;
  const initialDateStart = getInitialDateStart();
  const initialStartTime = getInitialStartTime();
  const [allMembersSelected, setAllMembersSelected] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const { me } = useUserContextProvider();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      dateStart: initialDateStart,
      participants: [],
      startTime: initialStartTime,
      duration: "30",
      description: "",
    } as ZoomForm,
    validateInputOnChange: true,
    validate: yupResolver(ZoomMeetingValidation),
  });

  function dataSelect(users: UserSession[]) {
    return users
      ?.filter((user) => user.id !== me?.id)
      .map((user) => {
        return {
          id: user.id,
          value: user.email ?? user.id,
          label: `${user.first_name} ${user.last_name}`,
        };
      });
  }

  function handleCloseModal() {
    close();
    form.reset();
    setAllMembersSelected(false);
  }

  function transformUserToParticipant(form: ZoomForm) {
    return form.participants.map((participant) => {
      const email = participant;
      return { email };
    });
  }

  function getUserBasedOnParticipants(values: ZoomForm) {
    const participants = values.participants.map((participant) => {
      const email = participant;
      const user = users.find((user) => user.email === email);
      return {
        directus_users_id: user?.id!,
      };
    });
    if (me && me.id) {
      participants.push({
        directus_users_id: me.id,
      });
    }

    return participants;
  }

  async function handleSubmitForm(values: ZoomForm) {
    const session = await getSession();
    if (!session?.acess_token) {
      throw new Error("Vous n'êtes pas connecté");
    }
    setLoadingForm(true);
    notifications.show({
      id: "crea",
      title: "Réunion Zoom",
      message: "Réunion en cours de création",
      color: "orange",
      loading: true,
    });

    try {
      const date = combineDateAndTime(values.dateStart, values.startTime);
      const tokenZoom = localStorage.getItem("zoom_access_token");

      const payload: ZoomPayload = {
        ...values,
        dateStart: date,
        participants: transformUserToParticipant(values),
      };

      if (!tokenZoom) {
        throw new Error("La connexion à Zoom a expiré");
      }

      const meeting = await postZoomMeeting(payload, tokenZoom);

      if (!meeting) {
        throw new Error("La réunion n'a pas pu être créé, veuillez réessayer");
      }

      const payloadDirectus: PayloadDirectusMeeting = {
        id: meeting.id,
        title: meeting.topic,
        join_url: meeting.join_url,
        meeting_invitees: [...getUserBasedOnParticipants(values)],
        duration: meeting.duration,
        start_date: new Date(values.dateStart).toISOString().split("T")[0],
        start_time: values.startTime.replace("h", ":"),
        description: values.description,
      };

      await postDirectusMeeting(payloadDirectus, session?.acess_token);

      setLoadingForm(false);
      handleCloseModal();

      notifications.update({
        id: "crea",
        title: "Réunion crée",
        message: "Votre réunion a bien été crée",
        color: "primary.1",
        icon: <CgCheck />,
        loading: false,
      });
    } catch (e) {
      notifications.update({
        id: "crea",
        title: "Réunion non crée",
        message: e as string,
        color: "red",
        icon: <CgCheck />,
        loading: false,
      });
      setLoadingForm(false);
    }
  }

  function _renderDateFields(form: UseFormReturnType<any, any>) {
    const currentDateInParis = getParisCurrentDate();
    return (
      <div className="flex w-full flex-col justify-between gap-5 md:flex-row lg:items-center">
        <DateInput
          leftSection={<CgCalendarDates />}
          {...form.getInputProps("dateStart")}
          minDate={currentDateInParis}
          label="Date"
          required
          key={form.key("dateStart")}
        />
        <Select
          data={Array.from({ length: 48 }, (_, i) => {
            const hours = Math.floor(i / 2)
              .toString()
              .padStart(2, "0");
            const minutes = i % 2 === 0 ? "00" : "30";
            return {
              value: `${hours}h${minutes}`,
              label: `${hours}h${minutes}`,
            };
          })}
          {...form.getInputProps("startTime")}
          label="À"
          required
          key={form.key("startTime")}
        />
        <div>
          <Text size="sm" fw={500} mb={3}>
            Durée
          </Text>
          <SegmentedControl
            className="w-full"
            withItemsBorders={false}
            fullWidth
            {...form.getInputProps("duration")}
            data={[
              { label: "15 min", value: "15" },
              { label: "30 min", value: "30" },
              { label: "40 min", value: "40" },
            ]}
            key={form.key("duration")}
          />
        </div>
      </div>
    );
  }

  function _renderMembersFields() {
    return (
      <div className="flex flex-col gap-1">
        <MultiSelect
          label="Membres"
          data={dataSelect(users!)}
          required
          searchable
          multiple
          disabled={allMembersSelected}
          {...form.getInputProps("participants")}
        />
        <Checkbox
          value={allMembersSelected.toString()}
          checked={allMembersSelected}
          onChange={() => setAllMembersSelected((prev) => !prev)}
          label="Tous les membres"
        />
      </div>
    );
  }

  return (
    <Modal
      size={isMobile ? "lg" : isTabled ? "95%" : "55%"}
      title={`Créer une réunion Zoom`}
      onClose={handleCloseModal}
      opened={opened}
      centered
    >
      <DatesProvider settings={{ locale: "fr", timezone: "Europe/London" }}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmitForm(values))}
          className="my-2 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5">
            <TextInput
              label="Titre de la réunion"
              required
              leftSection={<PiPen />}
              placeholder="Entrez le titre"
              {...form.getInputProps("title")}
              autoFocus
              key={form.key("title")}
            />
            {_renderDateFields(form)}
            {_renderMembersFields()}
            <Textarea
              label="Description"
              placeholder="Entrez une description"
              maxLength={255}
              autosize
              minRows={3}
              maxRows={4}
              {...form.getInputProps("description")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">* Champs obligatoires</p>
            <Button loading={loadingForm} type="submit">
              Créer la réunion
            </Button>
          </div>
        </form>
      </DatesProvider>
    </Modal>
  );
};

export default CreateZoomMeeting;
