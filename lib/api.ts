/**
 * API client for Agent Monetization Hub
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://agent-monetization-hub-backend-production.up.railway.app';

export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Auth
export async function register(email: string, password: string, firstName?: string, lastName?: string) {
  return apiCall('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }),
  });
}

export async function login(email: string, password: string) {
  return apiCall('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// Content
export async function getFrameworks(filters?: { effort_level?: string; revenue_potential?: string }) {
  const params = new URLSearchParams();
  if (filters?.effort_level) params.append('effort_level', filters.effort_level);
  if (filters?.revenue_potential) params.append('revenue_potential', filters.revenue_potential);
  
  return apiCall(`/api/v1/frameworks?${params.toString()}`);
}

export async function getRevenueStreams() {
  return apiCall('/api/v1/revenue-streams');
}

export async function getCaseStudies() {
  return apiCall('/api/v1/case-studies');
}

export async function getTools() {
  return apiCall('/api/v1/tools');
}

// Newsletter
export async function subscribeNewsletter(email: string, source?: string) {
  return apiCall('/api/v1/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, source }),
  });
}
