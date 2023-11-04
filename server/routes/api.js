const express = require('express');
const petController = require('../controllers/petController')
const router = express.Router();

router.patch('/:name', petController.updatePet, (req, res) => {
    res.status(200).json(res.locals.updatedPet);
  });

router.get('/:name', petController.updatePet, (req, res) => {
    res.status(200).json(pets);
  });


module.exports = router;
