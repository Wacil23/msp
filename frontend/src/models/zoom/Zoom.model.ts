import { UserSession } from "@/types/next-auth";

export interface ZoomForm {
  title: string;
  dateStart: Date;
  participants: [];
  startTime: string;
  duration: string;
  description?: string;
}
export interface ZoomPayload {
  title: string;
  dateStart: Date;
  participants: Participants[];
  duration: string;
  description?: string;
}

export interface DirectusUsersId {
  directus_users_id: string;
}

export interface PayloadDirectusMeeting {
  id: number;
  title: string;
  join_url: string;
  meeting_invitees: DirectusUsersId[];
  duration: number;
  start_date: string;
  start_time: string;
  description?: string;
}

export interface Participants {
  email: string;
}

export interface RequestBodyZoomMeetingSettings {
  meeting_invitees: Participants[];
  contact_email: string;
  contact_name: string;
  registrants_confirmation_email: boolean;
  registrants_email_notification: boolean;
}
export interface RequestBodyZoomMeeting {
  duration: number;
  start_time: Date;
  timezone: string;
  topic: string;
  settings: RequestBodyZoomMeetingSettings;
}

export interface DirectusMeeting {
  id: number;
  topic: string;
  join_url: string;
  settings: RequestBodyZoomMeetingSettings;
  duration: number;
}
