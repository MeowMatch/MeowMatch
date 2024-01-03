import { Request, Response } from 'express'
import { User } from '../models/userModel'

export const login: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username, password }).exec();

    if (user) {
      res.redirect('http://localhost:3000/pets');
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
}

