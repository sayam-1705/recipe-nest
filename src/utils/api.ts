import axios from "axios";
import { NextResponse } from "next/server";

export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiResponse = {
  success: (data: unknown, status: number = 200) => 
    NextResponse.json(data, { status }),
  
  error: (message: string, status: number = 500) => {
    console.error(`API Error (${status}):`, message);
    return NextResponse.json({ error: message }, { status });
  },
  
  notFound: (resource: string = "Resource") => 
    NextResponse.json({ error: `${resource} not found` }, { status: 404 }),
  
  badRequest: (message: string = "Invalid request") => 
    NextResponse.json({ error: message }, { status: 400 }),
  
  unauthorized: (message: string = "Authentication required") => 
    NextResponse.json({ error: message }, { status: 401 }),
  
  forbidden: (message: string = "Access denied") => 
    NextResponse.json({ error: message }, { status: 403 })
};
