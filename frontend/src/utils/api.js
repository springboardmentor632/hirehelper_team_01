export async function signupUser(userData) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Signup failed');
  return json;
}

export async function loginUser(credentials) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Login failed');
  return json;
}

export async function resendSignupOtp(email_id) {
  const res = await fetch('/api/auth/send-signup-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_id }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Resend OTP failed');
  return json;
}

export async function verifySignupOtp({ email_id, otp }) {
  const res = await fetch('/api/auth/verify-signup-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_id, otp }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'OTP verification failed');
  return json;
}

// Tasks API helpers
export async function fetchFeed() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/tasks/feed', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to fetch feed');
  return json.data || json.tasks || [];
}

// Requests API helpers
export async function sendRequest(taskId) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/requests', {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
    body: JSON.stringify({ taskId }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to send request');
  return json;
}

export async function getMyRequests() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/requests/my', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  let json = {};
  try { json = await res.json(); } catch (e) { json = {}; }
  if (!res.ok) throw new Error(`${res.status} ${json?.message || res.statusText || 'Failed to fetch your requests'}`);
  return json.data || [];
}

export async function getReceivedRequests() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/requests/received', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  let json = {};
  try { json = await res.json(); } catch (e) { json = {}; }
  if (!res.ok) throw new Error(`${res.status} ${json?.message || res.statusText || 'Failed to fetch received requests'}`);
  return json.data || [];
}

export async function updateRequestStatus(requestId, status) {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/requests/${requestId}/status`, {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
    body: JSON.stringify({ status }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to update request status');
  return json;
}

export async function fetchMyTasks() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/tasks/my', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to fetch my tasks');
  return json.tasks || [];
}

export async function createTask(formData) {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/tasks/register', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to create task');
  return json;
}

// Password Reset API helpers
export async function forgotPassword(email_id) {
  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_id }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'Failed to send OTP');
  return json;
}

export async function resetPassword({ email_id, otp, newPassword }) {
  const res = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_id, otp, newPassword }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || 'OTP verification failed');
  return json;
}
