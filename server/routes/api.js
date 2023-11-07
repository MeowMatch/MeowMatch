const express = require('express');
const petController = require('../controllers/petController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/pets', petController.getPets);

router.post('/pets', petController.addPet);

router.delete('/pets/:id', petController.deletePet);

router.patch('/pets/:id', petController.updatePet); 

router.post('/login', userController.login);

module.exports = router;
