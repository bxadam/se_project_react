const baseUrl = "http://localhost:3001";
import { checkResponse } from "./weatherApi";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function createItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => checkResponse(res));
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
}

export { getItems, createItems, deleteItems };
