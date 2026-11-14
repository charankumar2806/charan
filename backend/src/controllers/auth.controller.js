import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { demoUsers } from '../utils/demo-data.js';

const createToken = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = demoUsers.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = { id: `user-${Date.now()}`, name, email, password: hash, role: role || 'commuter' };
  demoUsers.push(newUser);
  const token = createToken(newUser);
  res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = demoUsers.find((entry) => entry.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const validPassword = await bcrypt.compare(password, user.password.startsWith('$2') ? user.password : await bcrypt.hash(password, 10));
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = createToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const me = (req, res) => {
  const user = demoUsers.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully.' });
};
