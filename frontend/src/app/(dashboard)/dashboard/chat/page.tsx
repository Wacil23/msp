"use client";
import { getMembersUsers } from "@/src/lib/services/users/Users";
import { UserSession } from "@/types/next-auth";
import { SubscriptionOptionsEvents } from "@directus/sdk";
import {
  ActionIcon,
  Avatar,
  Center,
  Divider,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { FiArrowUp } from "react-icons/fi";
import useSWR from "swr";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import useMessageHandler from "@/src/lib/hooks/chat/useMessageHandler";
import {
  MessageEvent,
  Messages,
} from "@/src/lib/types/messages/messages.types";
import useConnectWebSocket from "@/src/lib/hooks/websocket/useConnectWebsocket";
import useScrollEnd from "@/src/lib/hooks/scroll/useScrollEnd";

const Chat = () => {
  const { data: session } = useSession();
  const {
    activeMessages,
    messageHistory,
    setActiveMessages,
    addMessageToList,
    updateMessageSeenState,
    groupMessagesByUser,
  } = useMessageHandler();
  const [newMessage, setNewMessage] = React.useState(false);
  const [reciever, setReciever] = React.useState<{
    id: string;
    value: string;
  }>();
  const [messages, setMessages] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const token = session?.acess_token;
  const [groupedConversations, setGroupedConversations] = React.useState<
    Record<string, Messages[]>
  >({});
  const scrollToBottom = useScrollEnd(messagesEndRef);
  const client = useConnectWebSocket(token!);
  const fetcher = () => (token ? getMembersUsers(token!) : null);
  const { data: users } = useSWR(token ? "users/" : null, fetcher);

  React.useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  function readAllMessages() {
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
            "user_created.id",
            "is_seen",
            "user_reciever.id",
            "user_created.first_name",
            "user_created.last_name",
            "user_reciever.first_name",
            "user_reciever.last_name",
          ],
        },
      });
    }
  }

  React.useEffect(() => {
    if (!client) return;
    client.onWebSocket("open", () => {
      readAllMessages();
      subscribe("create");
      subscribe("update");
    });

    client.onWebSocket("message", function (data: MessageEvent) {
      if (data.type === "items" && Array.isArray(data.data)) {
        data.data.forEach((item) => {
          const userIsDefined =
            item.user_created?.id === session?.user.id ||
            item.user_reciever?.id === session?.user.id;
          if (userIsDefined) {
            addMessageToList(item);
          }
        });
      }
      if (data.type === "subscription" && data.event === "update") {
        data.data.forEach((item) => {
          const userIsDefined =
            item.user_created?.id === session?.user.id ||
            item.user_reciever?.id === session?.user.id;
          if (userIsDefined) {
            updateMessageSeenState(item);
          }
        });
      }
    });
    return () => client?.disconnect();
  }, [client]);

  const dataSelect = (users: UserSession[]) => {
    return users.map((user) => {
      return {
        id: user.id,
        value: `${user.first_name} ${user.last_name}`,
        label: `${user.first_name} ${user.last_name}`,
      };
    });
  };

  // Send a message to a reciever \\
  const messageSubmit = (text: string) => {
    if (client && text !== "" && reciever) {
      client.sendMessage({
        type: "items",
        collection: "messages",
        action: "create",
        data: {
          text: text.trim(),
          user_reciever: reciever?.id,
        },
      });
      setMessages("");
    }
  };

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

  React.useEffect(() => {
    if (messageHistory.length > 0 && session?.user.id) {
      const groupedMessages = groupMessagesByUser(
        messageHistory,
        session.user.id,
      );
      setGroupedConversations(groupedMessages);
      if (reciever) {
        const activeConvoMessages = groupedMessages[reciever.id] || [];
        setActiveMessages(activeConvoMessages);
      }
    }
  }, [messageHistory, reciever]);

  const handleConversationClick = (
    userId?: string,
    messagesParam?: Messages[],
  ) => {
    if (!client) return;
    let finalUserId = userId;
    let finalMessages = messagesParam;

    if (!finalUserId || !finalMessages) {
      if (!reciever) return;
      finalUserId = reciever.id;
      finalMessages = activeMessages;
    }

    if (!finalMessages) return;
    const user = users?.find((user) => user.id === finalUserId);
    if (!user) return;

    setReciever({ id: user.id, value: `${user.first_name} ${user.last_name}` });
    setNewMessage(true);
    setActiveMessages(finalMessages);

    const unreadMessages = finalMessages.filter(
      (m) => !m.is_seen && m.user_reciever.id === session?.user.id,
    );

    if (unreadMessages.length > 0) {
      unreadMessages.forEach((message) => {
        client.sendMessage({
          type: "items",
          collection: "messages",
          action: "update",
          id: message.id,
          data: { is_seen: true },
        });
      });
    }
  };

  return (
    <div className="m-10">
      <div className="h-full rounded-md bg-primary/55 p-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Chat</h1>
        </div>
        <div className="flex h-full gap-8 py-6">
          <div className="flex w-2/6 flex-col rounded-lg bg-primary p-5 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Vos conversations</h2>
              <ActionIcon
                color="lime"
                onClick={() => {
                  setNewMessage(true);
                  setReciever(undefined);
                  setMessages("");
                  setActiveMessages([]);
                }}
              >
                <CiEdit className="cursor-pointer" />
              </ActionIcon>
            </div>
            <div className="group flex max-h-[40rem] flex-col gap-6 overflow-y-scroll py-6">
              {Object.keys(groupedConversations).length > 0 ? (
                Object.entries(groupedConversations).map(
                  ([userId, messages]) => {
                    const user = users?.find((user) => user.id === userId);
                    return (
                      <motion.div
                        key={userId}
                        onClick={() =>
                          handleConversationClick(userId, messages)
                        }
                        whileHover={{ scale: 1.02 }}
                        initial={{ scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`${
                          reciever?.id === userId ? "bg-zinc-300/55" : ""
                        } flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-zinc-200/35 p-4 shadow-sm hover:bg-zinc-200`}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar
                            color="rgba(65, 191, 40, 1)"
                            variant="light"
                          ></Avatar>
                          <div>
                            <p className="font-bold capitalize text-darker/65">
                              {user?.first_name} {user?.last_name}
                            </p>
                            <Text
                              className={`${
                                !messages[messages.length - 1].is_seen &&
                                messages[messages.length - 1].user_created
                                  .id !== session?.user.id
                                  ? "!font-extrabold"
                                  : "!font-normal"
                              }`}
                              lineClamp={1}
                              size="xs"
                            >
                              {messages[messages.length - 1].user_created.id ===
                              session?.user.id
                                ? "vous : "
                                : ""}
                              {messages[messages.length - 1].text}
                            </Text>
                          </div>
                        </div>
                        {!messages[messages.length - 1].is_seen &&
                          messages[messages.length - 1].user_created.id ===
                            userId && (
                            <div className="h-2 w-2 rounded-full bg-secondary"></div>
                          )}
                      </motion.div>
                    );
                  },
                )
              ) : (
                <p>Pas de messages reçus</p>
              )}
            </div>
          </div>
          {!newMessage ? (
            <Center className="w-full">
              <h3 className="m-auto">
                Commencez à chater avec les membres de la msp
              </h3>
            </Center>
          ) : (
            <div className="flex h-full w-full flex-col justify-between rounded-lg bg-primary shadow-md">
              {reciever ? (
                <div className="flex items-center justify-between p-5">
                  <p className="font-semibold capitalize">{reciever.value}</p>
                </div>
              ) : (
                <Select
                  placeholder="Séléctionnez un membre"
                  searchable
                  className="p-5"
                  value={reciever}
                  onChange={(value) => {
                    const selectedUser = users!.find(
                      (user) =>
                        `${user.first_name} ${user.last_name}` === value,
                    );
                    if (selectedUser) {
                      setReciever({
                        id: selectedUser.id,
                        value: value!,
                      });
                    }
                  }}
                  data={dataSelect(users!)}
                />
              )}
              <div className="flex flex-col overflow-hidden">
                <div className="flex max-h-[35rem] min-h-[35rem] flex-col gap-1 overflow-auto px-4 py-1">
                  {activeMessages.length > 0 &&
                    activeMessages
                      .sort(
                        (a, b) =>
                          new Date(a.date_created).getTime() -
                          new Date(b.date_created).getTime(),
                      )
                      .map((message, index, messages) => {
                        const isLastMessage = index === messages.length - 1;
                        return (
                          <div
                            key={message.id}
                            className="relative flex flex-col"
                          >
                            <p
                              className={`relative max-w-[50%] rounded-3xl px-4 py-2 text-sm text-darker/85 ${
                                message.user_created.id === session?.user.id
                                  ? "self-end rounded-br-none bg-secondary"
                                  : "self-start rounded-bl-none bg-darker/5"
                              }`}
                            >
                              {message.text}
                            </p>
                            {message.user_created.id === session?.user.id &&
                              isLastMessage && (
                                <p className="mt-1 self-end text-xs text-gray-500">
                                  {message.is_seen ? "Vu" : "Distribué"}
                                </p>
                              )}
                          </div>
                        );
                      })}
                  <div ref={messagesEndRef}></div>
                </div>
                <Divider />
                <div className="flex items-end justify-between gap-4 p-5">
                  <Textarea
                    className="w-full"
                    autosize
                    maxRows={10}
                    onFocus={() => handleConversationClick()}
                    description={`${messages.length} / 500`}
                    value={messages}
                    onChange={(event) => setMessages(event.currentTarget.value)}
                    placeholder="Écrivez un message"
                  />
                  <FiArrowUp
                    onClick={() => messageSubmit(messages)}
                    className={` ${
                      messages === ""
                        ? "pointer-events-none bg-secondary/55"
                        : "cursor-pointer bg-secondary transition-colors"
                    } rounded-full p-2 transition-colors`}
                    size={35}
                    color={"white"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
