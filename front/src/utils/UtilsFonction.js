export function replaceUnderscores(str) {
  return str.replace(/_/g, " ");
}

// Function to capitalize the first character of a string
export function capitalizeFirstChar(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
