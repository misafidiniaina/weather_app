export function replaceUnderscores(str) {
  return str.replace(/_/g, " ");
}
export function replaceSpace(str) {
  return str.replace(/\s/g, "_");
}

// Function to capitalize the first character of a string
export function capitalizeFirstChar(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function fromatDate(dateString) {
  const parts = dateString.split(", ");
  if (parts.length !== 2) {
    // If the format is incorrect, return empty string or handle error
    return "";
  }

  // Extract the month and day from the second part
  const [month, day] = parts[1].split("/");
  const numericMonth = parseInt(month, 10);

  // Define arrays for mapping
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Create a new Date object to get the day of the week
  const dateObj = new Date(`2024-${numericMonth}-${day}`);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  // Return formatted date string
  return `${dayOfWeek}, ${parseInt(day, 10)} ${months[numericMonth - 1]}`;
}
