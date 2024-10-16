import { baseUrl } from "./api";
import { checkResponse } from "./weatherApi";
import { TOKEN } from "./constants";

function signUp({ name, email, password, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then(checkResponse)
    .catch((error) => console.error(error));
}

function signIn({ email, password }) {
  console.log({ email, password });
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .catch((error) => console.error(error));
}

function getUserProfile() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
  }).then(checkResponse);
}

function editProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export { signIn, signUp, getUserProfile, editProfile };
