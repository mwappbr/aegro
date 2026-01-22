import request from 'supertest';
import express from 'express';
import authRoutes from '../../routes/auth.routes';
import { errorHandler } from '../../middleware/error';

// Mock the auth service
jest.mock('../../services/auth.service', () => ({
  register: jest.fn(),
  login: jest.fn(),
}));

import { register, login } from '../../services/auth.service';
const mockRegister = register as jest.MockedFunction<typeof register>;
const mockLogin = login as jest.MockedFunction<typeof login>;

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const mockResponse = {
      user: {
        id: 1,
        name: userData.name,
        email: userData.email,
        createdAt: new Date('2026-01-15T10:00:00Z'),
      },
      token: 'jwt_token_123',
    };

    mockRegister.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      user: {
        id: mockResponse.user.id,
        name: mockResponse.user.name,
        email: mockResponse.user.email,
      },
      token: mockResponse.token,
    });
    expect(mockRegister).toHaveBeenCalledWith(userData);
  });

  it('should return 400 for invalid email format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Email');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should return 400 for password too short', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345', // Less than 6 characters
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Senha');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should return 400 for name too short', async () => {
    const invalidData = {
      name: 'J', // Less than 2 characters
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Nome');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = {
      name: 'John Doe',
      // Missing email and password
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should return 409 for duplicate email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password123',
    };

    const error: any = new Error('Email já está em uso');
    error.statusCode = 409;
    mockRegister.mockRejectedValue(error);

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(409);

    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Email já está em uso',
    });
    expect(mockRegister).toHaveBeenCalledWith(userData);
  });

  it('should return 400 for email exceeding max length', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'a'.repeat(101) + '@example.com', // Exceeds 100 characters
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should return 400 for password exceeding max length', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'a'.repeat(101), // Exceeds 100 characters
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(mockRegister).not.toHaveBeenCalled();
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user successfully', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const mockResponse = {
      user: {
        id: 1,
        name: 'John Doe',
        email: loginData.email,
      },
      token: 'jwt_token_123',
    };

    mockLogin.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200);

    expect(response.body).toMatchObject({
      user: {
        id: mockResponse.user.id,
        name: mockResponse.user.name,
        email: mockResponse.user.email,
      },
      token: mockResponse.token,
    });
    expect(mockLogin).toHaveBeenCalledWith(loginData);
  });

  it('should return 400 for invalid email format', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Email');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should return 400 for missing password', async () => {
    const invalidData = {
      email: 'john@example.com',
      // Missing password
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    // Zod returns "Required" when field is missing, or custom message when empty
    expect(['Required', 'Senha'].some(msg => response.body.message.includes(msg))).toBe(true);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should return 400 for empty password', async () => {
    const invalidData = {
      email: 'john@example.com',
      password: '',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Senha');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('should return 401 for invalid credentials (user not found)', async () => {
    const loginData = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    const error: any = new Error('Credenciais inválidas');
    error.statusCode = 401;
    mockLogin.mockRejectedValue(error);

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401);

    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Credenciais inválidas',
    });
    expect(mockLogin).toHaveBeenCalledWith(loginData);
  });

  it('should return 401 for invalid credentials (wrong password)', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'wrongpassword',
    };

    const error: any = new Error('Credenciais inválidas');
    error.statusCode = 401;
    mockLogin.mockRejectedValue(error);

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401);

    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Credenciais inválidas',
    });
    expect(mockLogin).toHaveBeenCalledWith(loginData);
  });
});
