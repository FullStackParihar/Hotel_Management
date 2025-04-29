// const Location = require('../model/LocationModel');


// // create a new location
// const createLocation = async (req, res) => {
//     try {
//         const { state, city } = req.body;
//         console.log(req.body);
        
//         const newLocation = new Location({
//             state,
//             city,
//             isActive: isActive !== undefined ? isActive : true
//         });
//         await newLocation.save();
//         res.status(201).json(newLocation);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // get all active locations
// const getAllLocations = async (req, res) => {
//     try {
//         const locations = await Location.find({ isActive: true });
//         res.status(200).json(locations);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // get one location by ID
// const getOneLocation = async (req, res) => {
//     try {
//         const location = await Location.findById(req.params.id);
//         if (!location) return res.status(404).json({ message: 'Location not found' });
//         res.status(200).json(location);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // update location by ID
// const updateLocation = async (req, res) => {
//     try {
//         const updated = await Location.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         if (!updated) return res.status(404).json({ message: 'Location not found' });
//         res.status(200).json(updated);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // delete location permanently by ID
// const deleteLocation = async (req, res) => {
//     try {
//         const deleted = await Location.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ message: 'Location not found' });
//         res.status(200).json({ message: 'Deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // soft delete (set isActive = false)
// const softDeleteLocation = async (req, res) => {
//     try {
//         const updated = await Location.findByIdAndUpdate(
//             req.params.id,
//             { isActive: false },
//             { new: true }
//         );
//         if (!updated) return res.status(404).json({ message: 'Location not found' });
//         res.status(200).json({ message: 'Soft deleted', data: updated });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = {
//     createLocation,
//     getAllLocations,
//     getOneLocation,
//     updateLocation,
//     deleteLocation,
//     softDeleteLocation
// };
const Location = require('../model/LocationModel');

const createLocation = async (req, res) => {
  try {
    const { state, city, isActive } = req.body;

    console.log('createLocation - Request body:', req.body);
    const newLocation = new Location({
      state,
      city,
      isActive: isActive !== undefined ? isActive : true
    });
    await newLocation.save();
    console.log('createLocation - Saved location:', newLocation);
    res.status(201).json(newLocation);
  } catch (err) {
    console.error('createLocation - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    console.log('getAllLocations - Found locations:', locations);
    res.status(200).json(locations);
  } catch (err) {
    console.error('getAllLocations - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getAllLocationsAll = async (req, res) => {
  try {
    const locations = await Location.find();
    console.log('getAllLocationsAll - Found locations:', locations);
    res.status(200).json(locations);
  } catch (err) {
    console.error('getAllLocationsAll - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getOneLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    console.log('getOneLocation - Found location:', location);
    res.status(200).json(location);
  } catch (err) {
    console.error('getOneLocation - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const updated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Location not found' });
    console.log('updateLocation - Updated location:', updated);
    res.status(200).json(updated);
  } catch (err) {
    console.error('updateLocation - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const deleted = await Location.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Location not found' });
    console.log('deleteLocation - Deleted location:', deleted);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('deleteLocation - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

const softDeleteLocation = async (req, res) => {
try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Soft delete failed", error: err });
  }
};

const ActivateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Activate failed", error: err });
  }
};
module.exports = {
  createLocation,
  getAllLocations,
  getAllLocationsAll,
  getOneLocation,
  updateLocation,
  deleteLocation,
  softDeleteLocation,
  ActivateLocation
};