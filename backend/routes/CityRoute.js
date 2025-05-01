const express = require('express');
const router = express.Router();
const CityController = require('../controller/CityController');

// Cities under a specific state
router.get('/states/:stateId/cities', CityController.getCitiesByState);

// Add new city
router.post('/cities/add', CityController.addCity);

// Update city
router.put('/cities/:id', CityController.updateCity);

// Delete city
router.delete('/cities/:id', CityController.deleteCity);

// Soft delete (deactivate)
router.patch('/cities/:id/softdelete', CityController.softDeleteCity);

// Activate city
router.patch('/cities/:id/activate', CityController.activateCity);

module.exports = router;
