import { useState, useCallback } from "react";
import { Messages } from "../../types/messages/messages.types";

const useMessageHandler = (initialState = []) => {
  const [activeMessages, setActiveMessages] =
    useState<Messages[]>(initialState);
  const [messageHistory, setMessageHistory] =
    useState<Messages[]>(initialState);
  const [messageUnread, setMessageUnread] = useState<Messages[]>(initialState);

  const addMessageToList = useCallback((message: Messages) => {
    setMessageHistory((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      return updatedMessages.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      );
    });

    setActiveMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      return updatedMessages.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      );
    });
  }, []);

  const updateMessageSeenState = useCallback((updatedMessage: Messages) => {
    setMessageUnread((prev) => [...prev, updatedMessage]);
    setMessageHistory((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === updatedMessage.id
          ? { ...msg, is_seen: updatedMessage.is_seen }
          : msg
      )
    );

    setActiveMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === updatedMessage.id
          ? { ...msg, is_seen: updatedMessage.is_seen }
          : msg
      )
    );
  }, []);

  const groupMessagesByUser = useCallback(
    (messages: Messages[], userId: string): Record<string, Messages[]> => {
      const grouped: Record<string, Messages[]> = {};
      messages.forEach((message) => {
        const otherUserId =
          message.user_created.id === userId
            ? message.user_reciever.id
            : message.user_created.id;
        if (!grouped[otherUserId]) {
          grouped[otherUserId] = [];
        }
        grouped[otherUserId].push(message);
      });
      Object.keys(grouped).forEach((userId) => {
        grouped[userId].sort(
          (a, b) =>
            new Date(a.date_created).getTime() -
            new Date(b.date_created).getTime()
        );
      });
      return grouped;
    },
    []
  );

  return {
    activeMessages,
    setActiveMessages,
    messageHistory,
    setMessageHistory,
    addMessageToList,
    updateMessageSeenState,
    groupMessagesByUser,
    messageUnread,
  };
};

export default useMessageHandler;
