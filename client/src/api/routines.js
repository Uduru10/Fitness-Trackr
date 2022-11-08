export async function fetchRoutines() {
  const response = await fetch("/api/routines");
  const result = await response.json();
  return result;
}
