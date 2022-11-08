export async function fetchRoutines() {
  const response = await fetch("/api/routines");
  const result = await response.json();
  return result;
}

export async function createRoutine(is_public, name, goal, token) {
  const response = await fetch("/api/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routine: {
        is_public,
        name,
        goal,
      },
    }),
  });
  const result = await response.json();
  return result;
}
