const express = require('express');
const petController = require('../controllers/petController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);

router.get('/pets', petController.getPets, (req, res) => {
  res.status(200).json(res.locals.pets);
});

router.get('/pets/:name', petController.getPetByName, (req, res) => {
  res.status(302).json(res.locals.petByName);
});

router.post('/pets', petController.addPet, (req, res) => {
  res.status(201).json(res.locals.newPet);
});

router.patch('/pets/:_id', petController.updatePet, (req, res) => {
  res.status(200).json(res.locals.updatedPet);
});

router.delete('/pets/:_id', petController.deletePet, (req, res) => {
  res.status(202).json({ message: 'Pet deleted successfully' });
});

module.exports = router;
