"use client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { getZoomCredentials } from "./reunion-action";
import { notifications } from "@mantine/notifications";
import { PiCheckLight } from "react-icons/pi";
import { sleep } from "@directus/sdk";
import CreateZoom from "@/src/components/_Dashboard/zoom/CreateZoom";

const Reunion: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function _isTokenValid() {
    const expiresAt = localStorage.getItem("zoom_expires_at");
    if (expiresAt) {
      return Date.now() < Number(expiresAt);
    }
    return false;
  }

  const handleFetchZoomData = async () => {
    const loadingZoomId = notifications.show({
      message: "Connexion vers zoom en cours. Veuillez patienter",
      title: "Connexion à Zoom",
      loading: true,
      autoClose: false,
      withCloseButton: false,
      color: "primary.1",
    });
    setLoading(true);
    setError(null);
    try {
      const result = await getZoomCredentials();
      await sleep(2000); //For better ux
      const expiresAt = Date.now() + result.expires_in * 1000;
      const accessToken = result.access_token;
      localStorage.setItem("zoom_access_token", accessToken);
      localStorage.setItem("zoom_expires_at", expiresAt.toString());
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
    } finally {
      notifications.update({
        id: loadingZoomId,
        message: "Vous êtes maintenant connecté à Zoom",
        title: "Connexion réussie",
        loading: false,
        autoClose: 4000,
        icon: <PiCheckLight color="black" />,
      });
      setLoading(false);
    }
  };

  function _getZoomStatus() {
    return (
      <p className="flex items-center justify-end gap-2 px-12 text-sm font-medium">
        Status de connexion à Zoom
        <span
          className={`size-2 rounded-full transition-colors duration-500 ${_isTokenValid() ? "bg-green-600" : "bg-red-600"}`}
        ></span>
      </p>
    );
  }

  return (
    <div className="w-full p-12">
      {_getZoomStatus()}
      <div className="rounded-md p-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Vos réunions</h1>

          {_isTokenValid() ? (
            <Button onClick={open}>Créer une réunion</Button>
          ) : (
            <Button loading={loading} onClick={handleFetchZoomData}>
              Se connecter à Zoom
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-y-6 p-20 md:grid-cols-3"></div>
      </div>
      <CreateZoom opened={opened} close={close} />
    </div>
  );
};

export default Reunion;
