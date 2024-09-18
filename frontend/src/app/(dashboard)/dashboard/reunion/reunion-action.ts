"use server";

export async function getZoomCredentials() {
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  const accountId = process.env.ZOOM_ACCOUNT_ID;

  if (!clientId || !clientSecret || !accountId) {
    throw new Error(
      "Les informations d'authentification Zoom ne sont pas configurées correctement.",
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const params = new URLSearchParams();
  params.append("grant_type", "account_credentials");
  params.append("account_id", accountId);
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
