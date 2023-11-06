const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router.get('/', petController.getPets, (req, res) => {
    res.status(200).json(res.locals.pets);
});

//get individual

router.post('/', petController.addPet, (req, res) => {
    res.status(201).json(res.locals.newPet);
});

// router.patch('/', petController.updatePet, (req, res) => {
//     res.status(200).json(res.locals.updatedPet);
// });


module.exports = router;
