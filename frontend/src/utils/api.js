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
