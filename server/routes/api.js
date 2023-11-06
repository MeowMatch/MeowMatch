const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router.get('/', petController.getPets, (req, res) => {
    res.status(200).json(res.locals.pets);
});

router.get('/:name', petController.getPetByName, (req, res) => {
    res.status(302).json(res.locals.petByName);
});

router.post('/', petController.addPet, (req, res) => {
    res.status(201).json(res.locals.newPet);
});

router.patch('/:name', petController.updatePet, (req, res) => {
    res.status(200).json(res.locals.updatedPet);
});

router.delete('/:name', petController.deletePet, (req, res) => {
    res.status(202).json({ message: 'Pet deleted successfully' });
})
module.exports = router;
