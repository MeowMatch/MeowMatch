import { Request, Response } from 'express';

const models = require('../models/petModel');

export const getPets: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  try {
    const pets = await models.Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).send('Error fetching pets');
  }
};

export const addPet: (req: Request, res: Response) => Promise<void> = async (req, res) => {
  const { name, age, description, url } = req.body;
  try {
    const newPet = await models.Pet.create({ name, age, description, url });
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).send('Error adding pet');
  }
};

export const deletePet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | void> = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await models.Pet.findByIdAndDelete(id);
    if (!deletedPet) {
      return res.status(404).json({ message: `Pet with ID ${id} not found` });
    }
    res.status(200).json({ message: `Pet with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).send(`Error deleting pet with ID ${id}`);
  }
};

export const updatePet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | void> = async (req, res) => {
  const { id } = req.params;
  const { name, age, description, url } = req.body;

  try {
    const updatedPet = await models.Pet.findByIdAndUpdate(
      id,
      { name, age, description, url },
      { new: true } // To return the updated record
    );

    if (!updatedPet) {
      return res.status(404).json({ message: `Pet with ID ${id} not found` });
    }

    res.status(200).json({ message: `Pet with ID ${id} updated successfully`, updatedPet });
  } catch (error) {
    res.status(500).send(`Error updating pet with ID ${id}`);
  }
};
