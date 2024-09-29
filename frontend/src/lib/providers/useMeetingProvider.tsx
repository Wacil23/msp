import React, { createContext, useContext, useState, useEffect } from "react";
import { getDirectusMeeting } from "@/src/app/(dashboard)/dashboard/reunion/reunion-action";
import { PayloadDirectusMeeting } from "@/src/models/zoom/Zoom.model";
import { useSession } from "next-auth/react";

interface MeetingContextProps {
  meetings: PayloadDirectusMeeting[] | null;
  fetchMeetings: () => void;
  setMeetings: React.Dispatch<
    React.SetStateAction<PayloadDirectusMeeting[] | null>
  >;
}

const MeetingContext = createContext<MeetingContextProps | undefined>(
  undefined,
);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: token } = useSession();
  const [meetings, setMeetings] = useState<PayloadDirectusMeeting[] | null>(
    null,
  );

  const fetchMeetings = async () => {
    if (token?.acess_token) {
      const fetchedMeetings = await getDirectusMeeting(token.acess_token);
      fetchedMeetings && setMeetings(fetchedMeetings);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [token?.acess_token]);

  return (
    <MeetingContext.Provider value={{ meetings, fetchMeetings, setMeetings }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeetingContext must be used within a MeetingProvider");
  }
  return context;
};
