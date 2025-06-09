const API_BASE = process.env.REACT_APP_API_BASE;

// Helper function to handle response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API error");
  }
  return response.json();
};

// GET /cases
export const fetchCases = async () => {
  const response = await fetch(`${API_BASE}/cases`);
  return handleResponse(response);
};

// POST /cases
export const addCase = async (caseData, token) => {
  const response = await fetch(`${API_BASE}/cases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(caseData),
  });
  return handleResponse(response);
};

// PATCH /cases/:id
export const updateCase = async (id, updates, token) => {
  const response = await fetch(`${API_BASE}/cases/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

// GET /stats
export const fetchStats = async () => {
  const response = await fetch(`${API_BASE}/stats`);
  return handleResponse(response);
};
