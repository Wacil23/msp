"use server";

import { directus } from "@/src/lib/directus";
import {
  DirectusMeeting,
  PayloadDirectusMeeting,
  Participants,
  RequestBodyZoomMeeting,
  RequestBodyZoomMeetingSettings,
  ZoomPayload,
} from "@/src/models/zoom/Zoom.model";
import {
  createItem,
  deleteItem,
  readItems,
  updateItem,
  withToken,
} from "@directus/sdk";

const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

export async function getZoomCredentials() {
  if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET || !ZOOM_ACCOUNT_ID) {
    throw new Error(
      "Les informations d'authentification Zoom ne sont pas configurées correctement.",
    );
  }

  const basicAuth = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`,
  ).toString("base64");

  const params = new URLSearchParams();
  params.append("grant_type", "account_credentials");
  params.append("account_id", ZOOM_ACCOUNT_ID);
  try {
    const response = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erreur lors de la récupération du token Zoom: ${errorData.reason || response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Une erreur server est survenue", e);
  }
}

export async function postZoomMeeting(payload: ZoomPayload, tokenZoom: string) {
  if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET || !ZOOM_ACCOUNT_ID) {
    throw new Error(
      "Les informations d'authentification Zoom ne sont pas configurées correctement.",
    );
  }

  const getEmailAndNameParticipants = (): Participants[] => {
    return payload.participants.map((participant) => {
      return {
        email: participant.email,
      };
    });
  };

  const requestSettingsBody: RequestBodyZoomMeetingSettings = {
    meeting_invitees: getEmailAndNameParticipants(),
    contact_email: "contact@docmsp.fr",
    contact_name: "Msp de Denain",
    registrants_confirmation_email: true,
    registrants_email_notification: true,
  };

  const requestBody: RequestBodyZoomMeeting = {
    duration: Number(payload.duration),
    start_time: payload.dateStart,
    timezone: "Europe/London",
    topic: payload.title,
    settings: requestSettingsBody,
  };

  const bearerToken = tokenZoom;

  try {
    const response = await fetch("https://zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erreur lors de la récupération du token Zoom: ${errorData.reason || response.statusText}`,
      );
    }

    const data: DirectusMeeting = await response.json();
    return data;
  } catch (e) {
    console.error("Une erreur server est survenue", e);
  }
}

export async function deleteZoomMeeting(id: string, tokenZoom: string) {}

export async function postDirectusMeeting(
  directusMeetingPayload: PayloadDirectusMeeting,
  token: string,
) {
  const api = directus();
  await api.request<DirectusMeeting>(
    withToken(token, createItem("meeting", directusMeetingPayload)),
  );
}

export async function getDirectusMeeting(token: string) {
  const api = directus();
  try {
    if (!token) {
      throw new Error("Aucun token retrouvé");
    }
    const meeting = await api.request<PayloadDirectusMeeting[]>(
      withToken(
        token,
        readItems<any, any, any>("meeting", {
          sort: ["-start_date"],
          fields: [
            "id",
            "title",
            "description",
            "start_date",
            "start_time",
            "join_url",
            "duration",
            "meeting_invitees.directus_users_id.first_name",
            "meeting_invitees.directus_users_id.last_name",
            "meeting_invitees.directus_users_id.email",
            "meeting_invitees.directus_users_id.id",
          ],
        }),
      ),
    );
    return meeting;
  } catch (e) {
    console.error("erreur : ", e);
  }
}

export async function deleteMeetingDirectus(token: string, id: string) {
  const api = directus();
  try {
    if (!token) {
      throw new Error("Aucun token retrouvé");
    }
    await api.request<PayloadDirectusMeeting[]>(
      withToken(token, deleteItem<any, string>("meeting", id)),
    );
  } catch (e) {
    console.error("erreur : ", e);
  }
}
