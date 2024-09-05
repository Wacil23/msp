"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const Reunion = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="w-full p-12">
      <div className="rounded-md p-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Vos réunions</h1>
          <Button onClick={open}>Créer une réunion</Button>
        </div>
        <div className="grid grid-cols-2 gap-y-6 p-20 md:grid-cols-3"></div>
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
