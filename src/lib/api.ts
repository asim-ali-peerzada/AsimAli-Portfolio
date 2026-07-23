// prefer VITE_API_BASE if provided, otherwise fall back to the old logic
export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.PROD ? 'https://solucomp.com/ets-backend/api' : 'http://ets.test/api');

export type ProjectPayload = {
  title: string;
  description: string;
  role?: string | 'Laravel Developer';
  tech_stack: string[];
  contributions: string[];
  challenges: string[];
  outcomes: string[];
};

export async function fetchNarrative(payload: ProjectPayload) {
  const res = await fetch(`${API_BASE}/ai-narrator/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI service error: ${res.status} ${text}`);
  }

  return res.json();
}
