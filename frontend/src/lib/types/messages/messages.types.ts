export type Messages = {
  id: string;
  date_created: string;
  text: string;
  is_seen: boolean;
  user_created: {
    id: string;
    first_name: string;
    last_name: string;
  };
  user_reciever: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

export type MessageEvent = {
  event: string;
  type: string;
  data: Messages[];
};
