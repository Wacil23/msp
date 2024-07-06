"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const Reunion = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="p-12 w-full">
      <div className="p-12 rounded-md bg-primary/55">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-2xl">Vos réunions</h1>
          <Button onClick={open}>Créer une réunion</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 p-20 gap-y-6"></div>
      </div>
      <Modal
        size={"65%"}
        title="Créer une réunion"
        onClose={close}
        opened={opened}
        centered
      >
        <form>
          <TextInput label="Nom de la réunion" />
          <TextInput label="Nom de la réunion" />
        </form>
      </Modal>
    </div>
  );
};

export default Reunion;
