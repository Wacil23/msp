import { Modal, Select, TextInput } from "@mantine/core";
import React from "react";
import { DateInput, DatesProvider, TimeInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm, UseFormReturnType } from "@mantine/form";
import { CgCalendarDates } from "react-icons/cg";
import { PiPen } from "react-icons/pi";
import { useWindowSize } from "../../../lib/hooks/window/useWindowSize";
import {
  getInitialDateStart,
  getInitialStartTime,
  getParisCurrentDate,
} from "@/src/utils/func/FormatDatesForm";

interface CreateZoomProps {
  opened: boolean;
  close: () => void;
}

interface ZoomForm {
  title: string;
  dateStart: Date;
  dateEnd: string;
  participants: never[];
  startTime: string;
}

const CreateZoom: React.FC<CreateZoomProps> = (props) => {
  const { opened, close } = props;
  const isMobile = useWindowSize().width <= 768;
  const isTabled = useWindowSize().width <= 1024;
  const initialDateStart = getInitialDateStart();
  const initialStartTime = getInitialStartTime();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      dateStart: initialDateStart,
      dateEnd: "",
      participants: [],
      startTime: initialStartTime,
    } as ZoomForm,
  });

  function _renderDateFields(form: UseFormReturnType<any, any>) {
    const currentDateInParis = getParisCurrentDate();
    return (
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <DateInput
          leftSection={<CgCalendarDates />}
          {...form.getInputProps("dateStart")}
          minDate={currentDateInParis}
          className="w-full md:w-fit"
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
          className="w-full md:w-24"
        />
      </div>
    );
  }

  return (
    <Modal
      size={isMobile ? "lg" : isTabled ? "80%" : "55%"}
      title="Créer une réunion"
      onClose={close}
      opened={opened}
      centered
    >
      <DatesProvider settings={{ locale: "fr", timezone: "Europe/Paris" }}>
        <form className="my-2 flex flex-col gap-3">
          <TextInput leftSection={<PiPen />} placeholder="Entrez le titre" />
          {_renderDateFields(form)}
        </form>
      </DatesProvider>
    </Modal>
  );
};

export default CreateZoom;
