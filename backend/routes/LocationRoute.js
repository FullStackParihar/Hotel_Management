const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const locationController = require('../controller/LocationController');

router.post('/add',auth, locationController.createLocation);
// get all active locations
router.get('/all',auth, locationController.getAllLocations);

// get one location by id
router.get('/:id', auth,locationController.getOneLocation);

// update location by id
router.put('/:id',auth, locationController.updateLocation);

// delete location permanently by id
router.delete('/:id',auth, locationController.deleteLocation);

// soft delete location by id
router.patch('/:id/softdelete',auth, locationController.softDeleteLocation);
router.patch('/:id/activate',auth, locationController.ActivateLocation);

module.exports = router;
