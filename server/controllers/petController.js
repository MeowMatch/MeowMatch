const models = require('../models/petModel');

const petController = {};

petController.getPets = async (req, res) => {
  try {
    const pets = await models.Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).send('Error fetching pets');
  }
};

petController.addPet = async (req, res) => {
  const { name, age, description, url } = req.body;
  try {
    const newPet = await models.Pet.create({ name, age, description, url });
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).send('Error adding pet');
  }
};

module.exports = petController;
