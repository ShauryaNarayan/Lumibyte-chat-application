// src/services/api.js
const API_BASE = 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    console.error('API error:', res.status, res.statusText);
    throw new Error('API request failed');
  }

  return res.json();
}

export function getSessions() {
  return request('/api/sessions');
}

export function createNewSession() {
  return request('/api/new-chat');
}

export function getSessionHistory(id) {
  return request(`/api/session/${id}`);
}

// ✅ FIXED — THIS IS THE IMPORTANT PART
export function sendMessage(id, question, model = 'gpt-3.5') {
  return request(`/api/chat/${id}`, {
    method: 'POST',
    body: JSON.stringify({ question, model }),
  });
}
