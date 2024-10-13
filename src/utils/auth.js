const baseUrl = "http://localhost:3001";
import { checkResponse } from "./weatherApi";

function signUp({ name, email, password, avatar }) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then(checkResponse)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function signIn() {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export { signIn, signUp };
