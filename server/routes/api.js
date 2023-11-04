const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router.get('/', petController.getPets);

router.post('/', petController.addPet);

module.exports = router;
