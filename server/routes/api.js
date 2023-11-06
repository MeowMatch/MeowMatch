const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router.get('/pets', petController.getPets);

router.post('/pets', petController.addPet);

module.exports = router;