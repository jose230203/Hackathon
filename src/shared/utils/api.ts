import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios instance with base URL
export const api = axios.create({
	baseURL: API_URL || "/api",
});

// Optional token setter for auth
let authToken: string | null = null;
export function setAuthToken(token: string | null) {
	authToken = token;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	// Attach Authorization header if available
	const token = authToken || (typeof window !== "undefined" ? (localStorage.getItem("token") || sessionStorage.getItem("token")) : null);
	if (token) {
		if (config.headers instanceof AxiosHeaders) {
			config.headers.set("Authorization", `Bearer ${token}`);
		} else {
			const existing = (config.headers || {}) as Record<string, string>;
			config.headers = { ...existing, Authorization: `Bearer ${token}` } as unknown as AxiosHeaders;
		}
	}
	return config;
});