import { api } from './client';
import { User } from '../types';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Register a new user
 * @param data User registration data
 * @returns User data and JWT token
 * @throws Error if registration fails
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response;
  } catch (error: unknown) {
    // Re-throw with a more user-friendly message if available
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao registrar usuário. Tente novamente.');
  }
}

/**
 * Login a user
 * @param data User login data (email, password)
 * @returns User data and JWT token
 * @throws Error if login fails
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response;
  } catch (error: unknown) {
    // Re-throw with a more user-friendly message if available
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao fazer login. Tente novamente.');
  }
}
