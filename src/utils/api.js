import { checkResponse } from "./weatherApi";
import { TOKEN } from "./constants";
const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function createItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(item),
  }).then((res) => checkResponse(res));
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
  }).then((res) => checkResponse(res));
}

export { baseUrl, getItems, createItems, deleteItems };
