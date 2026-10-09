const API_URL = "http://localhost:5000/api";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export async function getEvent(id: string) {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}
export async function calculateRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
) {
  const response = await fetch(`${API_URL}/route`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      startLat,
      startLng,
      endLat,
      endLng,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate route");
  }

  return response.json();
}