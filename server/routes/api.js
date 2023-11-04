const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

<<<<<<< HEAD
router.patch('/:name', petController.updatePet, (req, res) => {
    res.status(200).json(res.locals.updatedPet);
  });

router.get('/:name', petController.updatePet, (req, res) => {
    res.status(200).json(pets);
  });

=======
router.get('/', petController.getPets);

router.post('/', petController.addPet);
>>>>>>> dev

module.exports = router;
