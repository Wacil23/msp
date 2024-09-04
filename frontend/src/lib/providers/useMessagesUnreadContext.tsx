"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Messages,
  MessageEvent,
} from "@/src/lib/types/messages/messages.types";
import { useSession } from "next-auth/react";
import useConnectWebSocket from "@/src/lib/hooks/websocket/useConnectWebsocket";
import useMessageHandler from "@/src/lib/hooks/chat/useMessageHandler";
import { SubscriptionOptionsEvents } from "@directus/sdk";

interface UnreadMessagesContextProps {
  unreadMessages: Messages[];
}

const UnreadMessagesContext = createContext<
  UnreadMessagesContextProps | undefined
>(undefined);

export const UnreadMessagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: session } = useSession();
  const { messageHistory, addMessageToList, updateMessageSeenState } =
    useMessageHandler();
  const [unreadMessages, setUnreadMessages] = useState<Messages[]>([]);
  const token = session?.acess_token;
  const client = useConnectWebSocket(token!);

  useEffect(() => {
    const fetchUnreadMessages = () => {
      if (client) {
        client.sendMessage({
          type: "items",
          collection: "messages",
          action: "read",
          query: {
            limit: 300,
            sort: "-date_created",
            filter: {
              _or: [
                { user_created: session?.user.id },
                { user_reciever: session?.user.id },
              ],
            },
            fields: [
              "*",
              "is_seen",
              "user_created.id",
              "user_reciever.id",
              "user_created.first_name",
              "user_created.last_name",
              "user_reciever.first_name",
              "user_reciever.last_name",
            ],
          },
        });
      }
    };

    if (!client) return;
    client.onWebSocket("open", () => {
      fetchUnreadMessages();
      subscribe("create");
      subscribe("update");
    });

    client.onWebSocket("message", (data: MessageEvent) => {
      if (data.type === "items" && Array.isArray(data.data)) {
        data.data.forEach((item) => {
          if (!item.is_seen && item.user_reciever.id === session?.user.id) {
            addMessageToList(item);
          }
        });
      }
      if (data.type === "subscription" && data.event === "update") {
        data.data.forEach((item) => {
          updateMessageSeenState(item);
        });
      }
    });
    return () => client?.disconnect();
  }, [client]);

  useEffect(() => {
    const unread = messageHistory.filter(
      (message) =>
        !message.is_seen && message.user_reciever.id === session?.user.id,
    );
    setUnreadMessages(unread);
  }, [messageHistory]);

  const subscribe = async (event: SubscriptionOptionsEvents) => {
    if (!client) return;
    const { subscription } = await client.subscribe("messages", {
      event,
      query: {
        limit: 300,
        filter: {
          _or: [
            {
              user_created: session?.user.id,
            },
            {
              user_reciever: session?.user.id,
            },
          ],
        },
        fields: [
          "*",
          "is_seen",
          "user_created.id",
          "user_reciever.id",
          "user_created.first_name",
          "user_created.last_name",
          "user_reciever.first_name",
          "user_reciever.last_name",
        ],
      },
    });

    for await (const message of subscription) {
      if (message.event === "create" && message.type === "subscription") {
        addMessageToList(message.data[0] as Messages);
      }
    }
  };
  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => {
  const context = useContext(UnreadMessagesContext);
  if (!context) {
    throw new Error(
      "useUnreadMessages must be used within an UnreadMessagesProvider",
    );
  }
  return context;
};
