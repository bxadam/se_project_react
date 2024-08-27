const baseUrl = "http://localhost:3001";

function checkRes() {
  return (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  };
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes());
}

function createItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkRes());
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkRes());
}

export { getItems, createItems, deleteItems };
