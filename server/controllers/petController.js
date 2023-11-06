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

petController.deletePet = async (req, res) => {
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


// petController.deletePet = async (req, res) => {
//   const { name } = req.params;
//   try {
//     await models.Pet.deleteOne({ name }); 
//     res.status(200).json({ message: `Pet ${name} deleted successfully` });
//   } catch (error) {
//     res.status(500).send(`Error deleting pet ${name}`);
//   }
// };

module.exports = petController;
