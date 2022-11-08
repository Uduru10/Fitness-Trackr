export async function fetchActivities() {
  const response = await fetch("/api/activities");
  const result = await response.json();
  return result;
}
