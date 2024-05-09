// hooks/useWebSocket.ts
import { useEffect, useState } from "react";
import { directus } from "@/src/lib/directus";
import { WebSocketClient } from "@directus/sdk";

const useConnectWebSocket = (accessToken: string) => {
  const [client, setClient] = useState<WebSocketClient<any> | null>(null);
  useEffect(() => {
    if (accessToken) {
      const newClient = directus(accessToken);
      newClient.connect();
      setClient(newClient);

      return () => {
        newClient.disconnect();
      };
    }
  }, [accessToken]);

  return client;
};

export default useConnectWebSocket;
