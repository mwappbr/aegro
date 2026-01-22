/**
 * LocalStorage utility functions
 */

const TOKEN_KEY = 'token';

/**
 * Save token to localStorage
 * @param token JWT token string
 */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get token from localStorage
 * @returns Token string or null if not found
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove token from localStorage
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if token exists in localStorage
 * @returns True if token exists
 */
export function hasToken(): boolean {
  return getToken() !== null;
}
