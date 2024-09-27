export function getParisCurrentDate() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const parts = formatter.formatToParts(now);

  let day: number = 1;
  let month: number = 0;
  let year: number = 1970;
  let hour: number = 0;
  let minute: number = 0;
  let second: number = 0;

  for (const part of parts) {
    switch (part.type) {
      case "day":
        day = parseInt(part.value, 10);
        break;
      case "month":
        month = parseInt(part.value, 10) - 1;
        break;
      case "year":
        year = parseInt(part.value, 10);
        break;
      case "hour":
        hour = parseInt(part.value, 10);
        break;
      case "minute":
        minute = parseInt(part.value, 10);
        break;
      case "second":
        second = parseInt(part.value, 10);
        break;
      default:
        break;
    }
  }

  const parisDate = new Date(year, month, day, hour, minute, second);

  return parisDate;
}

export function getInitialDateTime() {
  const nowParis = getParisCurrentDate();
  let hours = nowParis.getHours();
  let minutes = nowParis.getMinutes();

  if (minutes >= 30) {
    minutes = 0;
    hours += 1;
  } else {
    minutes = 30;
  }

  // Ajuster la date si l'heure dépasse 23
  if (hours >= 24) {
    hours = hours % 24;
    nowParis.setDate(nowParis.getDate() + 1);
  }

  nowParis.setHours(hours);
  nowParis.setMinutes(minutes);
  nowParis.setSeconds(0);
  nowParis.setMilliseconds(0);

  return nowParis;
}

export function getInitialDateStart() {
  const initialDateTime = getInitialDateTime();
  return initialDateTime;
}

export function getInitialStartTime() {
  const initialDateTime = getInitialDateTime();
  const hours = initialDateTime.getHours().toString().padStart(2, "0");
  const minutes = initialDateTime.getMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
}

export function combineDateAndTime(dateStart: Date, timeStart: string): Date {
  // Vérifier le format de timeStart (ex: '18h30')
  const timeMatch = timeStart.match(/^(\d{2})h(\d{2})$/);
  if (!timeMatch) {
    throw new Error(`Format d'heure invalide : ${timeStart}`);
  }

  const hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);

  // Créer une nouvelle instance de Date pour éviter de modifier dateStart
  const combinedDate = new Date(dateStart);

  // Définir les heures et les minutes
  combinedDate.setHours(hours);
  combinedDate.setMinutes(minutes);
  combinedDate.setSeconds(0);
  combinedDate.setMilliseconds(0);

  return combinedDate;
}
