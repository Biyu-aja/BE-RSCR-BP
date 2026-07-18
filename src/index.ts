import 'dotenv/config';

import express, { Request, Response } from 'express';
import prisma from './config/db';
import { hashPassword, comparePassword, generateToken } from './utils/auth';
import { authenticateJWT, AuthenticatedRequest } from './middlewares/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check / Welcome
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to BE-RSCR-BP TypeScript API with Prisma & Authentication!' });
});

// POST /auth/register - Register a new user
app.post('/auth/register', async (req: Request, res: Response): Promise<any> => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
});

// POST /auth/login - Login a user and retrieve a JWT token
app.post('/auth/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Login process failed', details: error.message });
  }
});

// GET /users - Retrieve all users (Protected route)
app.get('/users', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
});

// GET /profile - Get current logged-in user profile (Protected route)
app.get('/profile', authenticateJWT, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User session context not found' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve profile', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
