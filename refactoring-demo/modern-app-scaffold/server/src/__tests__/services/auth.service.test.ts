import { PrismaClient } from '@prisma/client';
import { register, login } from '../../services/auth.service';
import { hashPassword, comparePassword } from '../../utils/bcrypt';
import { generateToken } from '../../utils/jwt';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

// Mock bcrypt and jwt utils
jest.mock('../../utils/bcrypt');
jest.mock('../../utils/jwt');

describe('Auth Service - register', () => {
  let prisma: jest.Mocked<PrismaClient>;
  const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;
  const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashed_password_123';
    const mockUser = {
      id: 1,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };
    const mockToken = 'jwt_token_123';

    // Mock Prisma calls
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    // Mock create to return only selected fields (simulating Prisma's select behavior)
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
    mockHashPassword.mockResolvedValue(hashedPassword);
    mockGenerateToken.mockReturnValue(mockToken);

    const result = await register(userData);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(mockHashPassword).toHaveBeenCalledWith(userData.password);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    expect(mockGenerateToken).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
    });
    expect(result.user).toEqual(mockUser);
    expect(result.token).toBe(mockToken);
  });

  it('should throw error if email already exists', async () => {
    const userData = {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password123',
    };

    const existingUser = {
      id: 1,
      name: 'Existing User',
      email: userData.email,
      password: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    await expect(register(userData)).rejects.toMatchObject({
      message: 'Email já está em uso',
      statusCode: 409,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(mockHashPassword).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('should hash password before saving', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashed_password_123';
    const mockUser = {
      id: 1,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    // Mock create to return only selected fields (simulating Prisma's select behavior)
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
    mockHashPassword.mockResolvedValue(hashedPassword);
    mockGenerateToken.mockReturnValue('token');

    await register(userData);

    expect(mockHashPassword).toHaveBeenCalledWith(userData.password);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  });

  it('should not return password in response', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashed_password_123';
    const mockUser = {
      id: 1,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    // Mock create to return only selected fields (simulating Prisma's select behavior)
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
    mockHashPassword.mockResolvedValue(hashedPassword);
    mockGenerateToken.mockReturnValue('token');

    const result = await register(userData);

    expect(result.user).not.toHaveProperty('password');
    expect(result.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      createdAt: mockUser.createdAt,
    });
  });
});

describe('Auth Service - login', () => {
  let prisma: jest.Mocked<PrismaClient>;
  const mockComparePassword = comparePassword as jest.MockedFunction<typeof comparePassword>;
  const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    jest.clearAllMocks();
  });

  it('should login a user successfully with valid credentials', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: loginData.email,
      password: 'hashed_password_123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockToken = 'jwt_token_123';

    // Mock Prisma calls
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValue(true);
    mockGenerateToken.mockReturnValue(mockToken);

    const result = await login(loginData);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginData.email },
    });
    expect(mockComparePassword).toHaveBeenCalledWith(loginData.password, mockUser.password);
    expect(mockGenerateToken).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
    });
    expect(result.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(result.token).toBe(mockToken);
    expect(result.user).not.toHaveProperty('password');
  });

  it('should throw 401 error if user does not exist', async () => {
    const loginData = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(login(loginData)).rejects.toMatchObject({
      message: 'Credenciais inválidas',
      statusCode: 401,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginData.email },
    });
    expect(mockComparePassword).not.toHaveBeenCalled();
    expect(mockGenerateToken).not.toHaveBeenCalled();
  });

  it('should throw 401 error if password is incorrect', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'wrongpassword',
    };

    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: loginData.email,
      password: 'hashed_password_123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValue(false);

    await expect(login(loginData)).rejects.toMatchObject({
      message: 'Credenciais inválidas',
      statusCode: 401,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginData.email },
    });
    expect(mockComparePassword).toHaveBeenCalledWith(loginData.password, mockUser.password);
    expect(mockGenerateToken).not.toHaveBeenCalled();
  });

  it('should not return password in response', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: loginData.email,
      password: 'hashed_password_123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    mockComparePassword.mockResolvedValue(true);
    mockGenerateToken.mockReturnValue('token');

    const result = await login(loginData);

    expect(result.user).not.toHaveProperty('password');
    expect(result.user).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
  });
});
