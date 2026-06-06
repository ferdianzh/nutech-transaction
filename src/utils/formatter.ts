export function formatDate(date: Date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  return `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
}
