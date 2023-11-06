const express = require('express');
const petController = require('../controllers/petController');
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/pets', petController.getPets);

router.post('/pets', petController.addPet);

router.post('/login', userController.login)

module.exports = router;
