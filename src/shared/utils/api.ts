import axios from "axios";

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

api.interceptors.request.use((config) => {
	// Attach Authorization header if available
	const token = authToken || (typeof window !== "undefined" ? (localStorage.getItem("token") || sessionStorage.getItem("token")) : null);
	if (token) {
		// Support both AxiosHeaders and plain object headers
		if (config.headers && typeof (config.headers as any).set === "function") {
			(config.headers as any).set("Authorization", `Bearer ${token}`);
		} else {
			(config.headers as any) = {
				...(config.headers as any),
				Authorization: `Bearer ${token}`,
			};
		}
	}
	return config;
});