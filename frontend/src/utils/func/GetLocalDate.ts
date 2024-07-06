const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  let formattedDate = date.toLocaleDateString("fr-FR", options);
  const dateParts = formattedDate.split(" ");
  if (dateParts[1].length > 3) {
    dateParts[1] = dateParts[1].substring(0, 3);
  }
  dateParts[1] =
    dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1) + ".";

  return `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;
};

export default formatDate;
