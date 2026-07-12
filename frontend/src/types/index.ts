export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AnalysisResult {
  verdict: string;
  trustScore: number;
  scamProbability: number;
  reasons: string[];
  summary?: string;
  transcript?: string;
  denomination?: string;
  confidence?: number;
}

export interface ScanHistoryItem {
  id: string;
  type: 'text' | 'audio' | 'image';
  title: string;
  verdict: string;
  trustScore: number;
  scamProbability?: number;
  summary: string;
  createdAt: string;
}
