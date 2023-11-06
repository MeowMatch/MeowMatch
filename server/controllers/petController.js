const models = require('../models/petModel');

const petController = {};

//get all pets for main page
petController.getPets = async (req, res, next) => {
  try {
    res.locals.pets = await models.Pet.find();
    next();
  } catch (error) {
    console.error('Error getting pets: ', error);
    next(error);
  }
};

//get pet by name
petController.getPetByName = async (req, res, next) => {
  try {
    const selectedPet = req.params.name;
    const pet = await models.Pet.findOne({ name: selectedPet });
    if (pet) {
      res.locals.petByName = { pet };
      return next();
    } else {
      return next({
        log: 'Error occurred within getPetByName middleware',
        status: 404,
        message: { err: 'No pet with this name found' },
      });
    }
  } catch (error) {
    console.error('Error getting pet: ', error);
    next(error);
  }
};

//add new pet to the registry
petController.addPet = async (req, res, next) => {
  const { name, age, description, url } = req.body;
  try {
    res.locals.newPet = await models.Pet.create({
      name,
      age,
      description,
      url,
    });
    next();
  } catch (error) {
    res.status(500).send('Error adding pet');
  }
};

//update a post/pet
petController.updatePet = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { newName, newAge, newDescription, newUrl } = req.body;
    const updateValues = {};

    if (newName) {
      updateValues.name = newName;
    }
    if (newAge) {
      updateValues.age = newAge;
    }
    if (newDescription) {
      updateValues.description = newDescription;
    }
    if (newUrl) {
      updateValues.url = newUrl;
    }

    const updatedPet = await models.Pet.findOneAndUpdate(
      { _id: _id },
      updateValues,
      { new: true }
    );
    if (!updatedPet) {
      return next({
        log: 'Error occurred within updatePet middleware',
        status: 404,
        message: { err: 'No pet with this name found' },
      });
    }
    res.locals.updatedPet = updatedPet;
    next();
  } catch (error) {
    console.log('An error occurred while updating your pet: ', error);
    next(error);
  }
};

//delete pet from registry
petController.deletePet = async (req, res, next) => {
  try {
    const deletedPet = req.params._id;
    await models.Pet.findOneAndDelete({ _id: deletedPet });
    next();
  } catch (error) {
    console.error('Error deleting pet: ', error);
    next(error);
  }
};

module.exports = petController;
