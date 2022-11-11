export async function fetchRA() {
  const response = await fetch("/api/ra");
  const result = await response.json();
  return result;
}

export async function createRA(routine_id, activity_id, duration, count) {
  const response = await fetch("/api/ra", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      routine_id,
      activity_id,
      duration,
      count,
    }),
  });
  const result = await response.json();
  return result;
}

export async function editRA(count, duration, id) {
  const response = await fetch(`/api/ra/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count,
      duration,
    }),
  });
  const result = await response.json();
  return result;
}
