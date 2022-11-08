import { application, response } from "express";

export async function fetchUsers() {
  const response = await fetch("/api/users");
  const result = await response.json();
  return result;
}

export async function registerUser(username, password) {
  const response = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      users: {
        username,
        password,
      },
    }),
  });
  const result = await response.json();
  return result;
}

export async function loginUser(username, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      users: {
        username,
        password,
      },
    }),
  });
  const result = await response.json();
  return result;
}

export async function fetchMe(token) {
  const response = await fetch("/api/users/me", {
    headers: {
      "Content-Type": "application.json",
      Authorization: `Bearer ${token}`,
    },
  });
}
const result = await response.json();
return result;
