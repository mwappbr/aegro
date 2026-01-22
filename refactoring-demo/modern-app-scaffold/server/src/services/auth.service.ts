import { PrismaClient } from '@prisma/client';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middleware/error';

const prisma = new PrismaClient();

export interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  };
  token: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

/**
 * Register a new user
 * @param data User registration data (name, email, password)
 * @returns User data (without password) and JWT token
 * @throws AppError with statusCode 409 if email already exists
 */
export async function register(data: RegisterInput): Promise<RegisterResponse> {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const error: AppError = new Error('Email já está em uso');
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user,
    token,
  };
}

/**
 * Login a user
 * @param data User login data (email, password)
 * @returns User data (without password) and JWT token
 * @throws AppError with statusCode 401 if credentials are invalid
 */
export async function login(data: LoginInput): Promise<LoginResponse> {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    const error: AppError = new Error('Credenciais inválidas');
    error.statusCode = 401;
    throw error;
  }

  // Compare password with bcrypt
  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    const error: AppError = new Error('Credenciais inválidas');
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
