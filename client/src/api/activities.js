export async function fetchActivities() {
  const response = await fetch("/api/activities");
  const result = await response.json();
  return result;
}

export async function createActivity(name, description) {
  const response = await fetch("/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}

export async function RoutinesByActivityId(id) {
  const response = await fetch(`/api/${id}/routines`);
  const result = await response.json();
  return result;
}

export async function editActivity(name, description) {
  const response = await fetch(`/api/activities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}
