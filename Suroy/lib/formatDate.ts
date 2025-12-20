export default function formatDateSimple(dateInput: Date) {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
}
