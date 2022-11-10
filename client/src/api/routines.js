export async function fetchRoutines() {
  const response = await fetch("/api/routines");
  const result = await response.json();
  return result;
}

export async function createRoutine(is_public, name, goal) {
  const response = await fetch("/api/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
}

export const fetchSingleRoutine = async (id) => {
  const response = await fetch(`/api/routines/${id}`);
  const result = await response.json();

  return result;
};

export const deleteRoutineById = async (id) => {
  const response = await fetch(`/api/routines/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export async function editRoutine(is_public, name, goal, id) {
  const response = await fetch(`/api/routines/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
}
