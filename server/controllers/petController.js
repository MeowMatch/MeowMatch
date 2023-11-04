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
  const { name, age, description } = req.body;
  try {
    const newPet = await models.Pet.create({name, age,description});
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).send('Error adding pet');
  }
};

// petController.updatePet = async (req, res) => {
//     const { name, age, description } = req.params;
//     const { newName, newAge, newDescription } = req.body;
//     Pet.findOneAndUpdate(
//         { name: name },
//         { name: newName},
//         { age: age },
//         { age: newAge },
//         { description: description },
//         { description: newDescription },
//         { new: true },
//     )
//         .then((updatedPet) => {
//             if (!updatedPet) {
//                 return next({
//                     log: 'Error occurred within updateStudent middleware',
//                     status: 404,
//                     message: { err: 'No student with this name found' },
//                   });
//             }
//             res.locals.updatedPet = { updatedPet };
//             next();
//         })
//         .catch((error) => {
//             console.log('An error occurred while updating your pet: ', error);
//             next(error);
//         })
// }
petController.updatePet = async (req, res, next) => {
    try {
        const { name } = req.params;
        const { newName, newAge, newDescription } = req.body;

        // Define an object to store the new values you want to update
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

        // Use async/await with try/catch for better error handling
        const updatedPet = await Pet.findOneAndUpdate({ name: name }, updateValues, { new: true });

        if (!updatedPet) {
            return next({
                log: 'Error occurred within updatePet middleware',
                status: 404,
                message: { err: 'No pet with this name found' },
            });
        }

        res.locals.updatedPet = updatedPet; // No need to wrap it in an object

        next();
    } catch (error) {
        console.log('An error occurred while updating your pet: ', error);
        next(error);
    }
};


// petController.deletePet = async (req, res) = {

// }

module.exports = petController;
