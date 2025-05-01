const express = require('express');
const router = express.Router();
const HotelController = require('../controller/HotelController');

// Hotels under a specific city
router.get('/cities/:cityId/hotels', HotelController.getHotelsByCity);

// Add new hotel
router.post('/hotels/add', HotelController.addHotel);

// Update hotel
router.put('/hotels/:id', HotelController.updateHotel);

// Delete hotel
router.delete('/hotels/:id', HotelController.deleteHotel);

// Soft delete (deactivate)
router.patch('/hotels/:id/softdelete', HotelController.softDeleteHotel);

// Activate hotel
router.patch('/hotels/:id/activate', HotelController.activateHotel);

module.exports = router;
