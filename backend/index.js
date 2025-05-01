// // Location Manager Backend with Mongoose Population
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/location-manager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Define Schemas
// const stateSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   code: { type: String, required: true, unique: true },
//   country: { type: String, default: 'India' },
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const citySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
//   pincode: String,
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
//   address: String,
//   rating: { type: Number, min: 1, max: 5, default: 3 },
//   amenities: [String],
//   priceRange: { 
//     min: Number, 
//     max: Number 
//   },
//   contact: {
//     phone: String,
//     email: String
//   },
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // Create models
// const State = mongoose.model('State', stateSchema);
// const City = mongoose.model('City', citySchema);
// const Hotel = mongoose.model('Hotel', hotelSchema);

// // Routes

// // Serve the HTML page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // State Routes
// app.get('/api/states', async (req, res) => {
//   try {
//     const states = await State.find({ active: true });
//     res.json(states);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/states', async (req, res) => {
//   try {
//     const state = new State(req.body);
//     await state.save();
//     res.status(201).json(state);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // City Routes
// app.get('/api/cities', async (req, res) => {
//   try {
//     const { stateId } = req.query;
//     const query = { active: true };
    
//     if (stateId) {
//       query.state = stateId;
//     }
    
//     const cities = await City.find(query).populate('state', 'name code');
//     res.json(cities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/cities', async (req, res) => {
//   try {
//     const city = new City(req.body);
//     await city.save();
//     res.status(201).json(city);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Hotel Routes
// app.get('/api/hotels', async (req, res) => {
//   try {
//     const { cityId } = req.query;
//     const query = { active: true };
    
//     if (cityId) {
//       query.city = cityId;
//     }
    
//     const hotels = await Hotel.find(query)
//       .populate({
//         path: 'city',
//         select: 'name pincode',
//         populate: {
//           path: 'state',
//           select: 'name code'
//         }
//       });
    
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/hotels', async (req, res) => {
//   try {
//     const hotel = new Hotel(req.body);
//     await hotel.save();
//     res.status(201).json(hotel);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get cities by state ID
// app.get('/api/states/:stateId/cities', async (req, res) => {
//   try {
//     const { stateId } = req.params;
//     const cities = await City.find({ state: stateId, active: true });
//     res.json(cities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get hotels by city ID
// app.get('/api/cities/:cityId/hotels', async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const hotels = await Hotel.find({ city: cityId, active: true });
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Open http://localhost:${PORT} in your browser to use the application`);
// });

// // Helper function to seed initial data (for testing)
// const seedData = async () => {
//   try {
//     // Check if data already exists
//     const statesCount = await State.countDocuments();
    
//     if (statesCount === 0) {
//       console.log('Seeding initial data...');
      
//       // Create some states
//       const maharashtra = await State.create({ name: 'Maharashtra', code: 'MH' });
//       const karnataka = await State.create({ name: 'Karnataka', code: 'KA' });
//       const gujarat = await State.create({ name: 'Gujarat', code: 'GJ' });
      
//       // Create some cities
//       const mumbai = await City.create({ name: 'Mumbai', state: maharashtra._id, pincode: '400001' });
//       const pune = await City.create({ name: 'Pune', state: maharashtra._id, pincode: '411001' });
//       const nagpur = await City.create({ name: 'Nagpur', state: maharashtra._id, pincode: '440001' });
      
//       const bangalore = await City.create({ name: 'Bangalore', state: karnataka._id, pincode: '560001' });
//       const mysore = await City.create({ name: 'Mysore', state: karnataka._id, pincode: '570001' });
      
//       const ahmedabad = await City.create({ name: 'Ahmedabad', state: gujarat._id, pincode: '380001' });
//       const surat = await City.create({ name: 'Surat', state: gujarat._id, pincode: '395001' });
      
//       // Create some hotels
//       await Hotel.create({
//         name: 'Grand Hyatt',
//         city: mumbai._id,
//         address: 'Off Western Express Highway, Santacruz East',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 15000, max: 50000 },
//         contact: { phone: '022-12345678', email: 'info@grandhyatt.com' }
//       });
      
//       await Hotel.create({
//         name: 'The Taj Mahal Palace',
//         city: mumbai._id,
//         address: 'Apollo Bunder, Colaba',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Multiple Restaurants', 'Bar'],
//         priceRange: { min: 20000, max: 80000 },
//         contact: { phone: '022-22345678', email: 'info@tajhotels.com' }
//       });
      
//       await Hotel.create({
//         name: 'JW Marriott Pune',
//         city: pune._id,
//         address: 'Senapati Bapat Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 12000, max: 40000 },
//         contact: { phone: '020-12345678', email: 'info@jwmarriott.com' }
//       });
      
//       await Hotel.create({
//         name: 'Pride Hotel',
//         city: nagpur._id,
//         address: 'Wardha Road',
//         rating: 4,
//         amenities: ['Pool', 'Restaurant', 'Gym'],
//         priceRange: { min: 5000, max: 12000 },
//         contact: { phone: '0712-12345678', email: 'info@pridehotel.com' }
//       });
      
//       await Hotel.create({
//         name: 'Leela Palace',
//         city: bangalore._id,
//         address: 'Old Airport Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Restaurant'],
//         priceRange: { min: 18000, max: 60000 },
//         contact: { phone: '080-12345678', email: 'info@theleela.com' }
//       });
      
//       await Hotel.create({
//         name: 'Radisson Blu',
//         city: bangalore._id,
//         address: 'Outer Ring Road',
//         rating: 4,
//         amenities: ['Pool', 'Gym', 'Restaurant'],
//         priceRange: { min: 8000, max: 20000 },
//         contact: { phone: '080-23456789', email: 'info@radissonblu.com' }
//       });
      
//       await Hotel.create({
//         name: 'Royal Orchid',
//         city: mysore._id,
//         address: 'Brindavan Extension',
//         rating: 4,
//         amenities: ['Restaurant', 'Swimming Pool', 'Gym'],
//         priceRange: { min: 6000, max: 15000 },
//         contact: { phone: '0821-12345678', email: 'info@royalorchid.com' }
//       });
      
//       await Hotel.create({
//         name: 'Hyatt Regency',
//         city: ahmedabad._id,
//         address: 'Ashram Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 9000, max: 25000 },
//         contact: { phone: '079-12345678', email: 'info@hyattahmedabad.com' }
//       });
      
//       await Hotel.create({
//         name: 'The Gateway Hotel',
//         city: surat._id,
//         address: 'Ghod Dod Road',
//         rating: 4,
//         amenities: ['Restaurant', 'Pool', 'Business Center'],
//         priceRange: { min: 7000, max: 18000 },
//         contact: { phone: '0261-12345678', email: 'info@gateway.com' }
//       });
      
//       console.log('Data seeding completed');
//     }
//   } catch (err) {
//     console.error('Error seeding data:', err);
//   }
// };

// // Call the seed function (comment this out in production)
// seedData();

// module.exports = { app, State, City, Hotel };
 
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   cors({
//     origin: '*', // Adjust to match your React app's origin
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost:27017/location-manager', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Schemas
// const stateSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   code: { type: String, required: true, unique: true },
//   country: { type: String, default: 'India' },
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const citySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
//   pincode: String,
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
//   address: String,
//   rating: { type: Number, min: 1, max: 5 },
//   amenities: [String],
//   priceRange: {
//     min: Number,
//     max: Number,
//   },
//   contact: {
//     phone: String,
//     email: String,
//   },
//   active: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const locationSchema = new mongoose.Schema({
//   state: { type: String, required: true },
//   city: { type: String, required: true },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// // Models
// const State = mongoose.model('State', stateSchema);
// const City = mongoose.model('City', citySchema);
// const Hotel = mongoose.model('Hotel', hotelSchema);
// const Location = mongoose.model('Location', locationSchema);

// // Routes



// // State Routes
// app.get('/api/states', async (req, res) => {
  
//   try {
//     const states = await State.find({ active: true }).sort('name');
//     res.json(states);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to fetch states: ${err.message}` });
//   }
// });

// app.post('/api/states/add', async (req, res) => {
//   console.log("fghj",req.body);
  
//   try {
//     const { name, code } = req.body;
//     console.log('Request body:', req.body);
    
//     if (!name ) {
//       return res.status(400).json({ error: 'Name and code are required' });
//     }

//     // Check if state with the same name or code already exists
//     const existingState = await State.findOne({ $or: [{ name }, { code }] });
//     if (existingState) {
//       return res.status(400).json({ error: 'State with the same name or code already exists' });
//     }

//     const state = new State({ name, code });
//     await state.save();
//     res.status(201).json(state);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to create state: ${err.message}` });
//   }
// });

// app.put('/api/states/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, code } = req.body;
//     if (!name || !code) {
//       return res.status(400).json({ error: 'Name and code are required' });
//     }
//     const state = await State.findByIdAndUpdate(
//       id,
//       { name, code, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );
//     if (!state) {
//       return res.status(404).json({ error: 'State not found' });
//     }
//     res.json(state);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to update state: ${err.message}` });
//   }
// });

// app.delete('/api/states/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const state = await State.findById(id);
//     if (!state) {
//       return res.status(404).json({ error: 'State not found' });
//     }
//     // Check for dependent cities
//     const cityCount = await City.countDocuments({ state: id });
//     if (cityCount > 0) {
//       return res.status(400).json({ error: 'Cannot delete state with associated cities' });
//     }
//     await State.findByIdAndDelete(id);
//     res.json({ message: 'State deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: `Failed to delete state: ${err.message}` });
//   }
// });

// // City Routes
// app.get('/api/states/:stateId/cities', async (req, res) => {
//   try {
//     const { stateId } = req.params;
//     const cities = await City.find({ state: stateId, active: true }).sort('name');
//     res.json(cities);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to fetch cities: ${err.message}` });
//   }
// });

// app.post('/api/cities/add', async (req, res) => {
//   try {
//     const { name, stateId, pincode } = req.body;
//     if (!name || !stateId) {
//       return res.status(400).json({ error: 'Name and stateId are required' });
//     }
//     // Verify state exists
//     const state = await State.findById(stateId);
//     if (!state) {
//       return res.status(400).json({ error: 'Invalid stateId' });
//     }
//     const city = new City({ name, state: stateId, pincode });
//     await city.save();
//     res.status(201).json(city);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to create city: ${err.message}` });
//   }
// });

// app.put('/api/cities/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, stateId, pincode } = req.body;
//     if (!name || !stateId) {
//       return res.status(400).json({ error: 'Name and stateId are required' });
//     }
//     // Verify state exists
//     const state = await State.findById(stateId);
//     if (!state) {
//       return res.status(400).json({ error: 'Invalid stateId' });
//     }
//     const city = await City.findByIdAndUpdate(
//       id,
//       { name, state: stateId, pincode, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );
//     if (!city) {
//       return res.status(404).json({ error: 'City not found' });
//     }
//     res.json(city);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to update city: ${err.message}` });
//   }
// });

// app.delete('/api/cities/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const city = await City.findById(id);
//     if (!city) {
//       return res.status(404).json({ error: 'City not found' });
//     }
//     // Check for dependent hotels
//     const hotelCount = await Hotel.countDocuments({ city: id });
//     if (hotelCount > 0) {
//       return res.status(400).json({ error: 'Cannot delete city with associated hotels' });
//     }
//     await City.findByIdAndDelete(id);
//     res.json({ message: 'City deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: `Failed to delete city: ${err.message}` });
//   }
// });

// // Hotel Routes
// app.get('/api/cities/:cityId/hotels', async (req, res) => {
//   try {
//     const { cityId } = req.params;
//     const hotels = await Hotel.find({ city: cityId, active: true })
//       .populate({
//         path: 'city',
//         select: 'name pincode',
//         populate: {
//           path: 'state',
//           select: 'name code',
//         },
//       })
//       .sort('name');
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to fetch hotels: ${err.message}` });
//   }
// });

// app.post('/api/hotels/add', async (req, res) => {
//   try {
//     const { name, cityId, address, rating, amenities, priceRange, contact } = req.body;
//     if (!name || !cityId) {
//       return res.status(400).json({ error: 'Name and cityId are required' });
//     }
//     // Verify city exists
//     const city = await City.findById(cityId);
//     if (!city) {
//       return res.status(400).json({ error: 'Invalid cityId' });
//     }
//     const hotel = new Hotel({
//       name,
//       city: cityId,
//       address,
//       rating,
//       amenities,
//       priceRange,
//       contact,
//     });
//     await hotel.save();
//     res.status(201).json(hotel);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to create hotel: ${err.message}` });
//   }
// });

// app.put('/api/hotels/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, cityId, address, rating, amenities, priceRange, contact } = req.body;
//     if (!name || !cityId) {
//       return res.status(400).json({ error: 'Name and cityId are required' });
//     }
//     // Verify city exists
//     const city = await City.findById(cityId);
//     if (!city) {
//       return res.status(400).json({ error: 'Invalid cityId' });
//     }
//     const hotel = await Hotel.findByIdAndUpdate(
//       id,
//       {
//         name,
//         city: cityId,
//         address,
//         rating,
//         amenities,
//         priceRange,
//         contact,
//         updatedAt: Date.now(),
//       },
//       { new: true, runValidators: true }
//     );
//     if (!hotel) {
//       return res.status(404).json({ error: 'Hotel not found' });
//     }
//     res.json(hotel);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to update hotel: ${err.message}` });
//   }
// });

// app.delete('/api/hotels/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hotel = await Hotel.findByIdAndDelete(id);
//     if (!hotel) {
//       return res.status(404).json({ error: 'Hotel not found' });
//     }
//     res.json({ message: 'Hotel deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: `Failed to delete hotel: ${err.message}` });
//   }
// });

// // Location Routes
// app.get('/locations/all', async (req, res) => {
//   try {
//     const locations = await Location.find().sort('-createdAt');
//     res.json(locations);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to fetch locations: ${err.message}` });
//   }
// });

// app.post('/locations/add', async (req, res) => {
//   try {
//     const { state, city } = req.body;
//     if (!state || !city) {
//       return res.status(400).json({ error: 'State and city are required' });
//     }
//     const location = new Location({ state, city });
//     await location.save();
//     res.status(201).json(location);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to create location: ${err.message}` });
//   }
// });

// app.put('/locations/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { state, city } = req.body;
//     if (!state || !city) {
//       return res.status(400).json({ error: 'State and city are required' });
//     }
//     const location = await Location.findByIdAndUpdate(
//       id,
//       { state, city, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json(location);
//   } catch (err) {
//     res.status(400).json({ error: `Failed to update location: ${err.message}` });
//   }
// });

// app.delete('/locations/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const location = await Location.findByIdAndDelete(id);
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json({ message: 'Location deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: `Failed to delete location: ${err.message}` });
//   }
// });

// app.patch('/locations/:id/activate', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const location = await Location.findByIdAndUpdate(
//       id,
//       { isActive: true, updatedAt: Date.now() },
//       { new: true }
//     );
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json(location);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to activate location: ${err.message}` });
//   }
// });

// app.get('/test', (req, res) => res.send('Server is working'));


// app.patch('/locations/:id/softdelete', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const location = await Location.findByIdAndUpdate(
//       id,
//       { isActive: false, updatedAt: Date.now() },
//       { new: true }
//     );
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json(location);
//   } catch (err) {
//     res.status(500).json({ error: `Failed to soft-delete location: ${err.message}` });
//   }
// });

// // Seed initial data (for testing)
// const seedData = async () => {
//   try {
//     const statesCount = await State.countDocuments();
//     if (statesCount === 0) {
//       console.log('Seeding initial data...');

//       // States
//       const maharashtra = await State.create({ name: 'Maharashtra', code: 'MH' });
//       const karnataka = await State.create({ name: 'Karnataka', code: 'KA' });
//       const gujarat = await State.create({ name: 'Gujarat', code: 'GJ' });

//       // Cities
//       const mumbai = await City.create({ name: 'Mumbai', state: maharashtra._id, pincode: '400001' });
//       const pune = await City.create({ name: 'Pune', state: maharashtra._id, pincode: '411001' });
//       const nagpur = await City.create({ name: 'Nagpur', state: maharashtra._id, pincode: '440001' });
//       const bangalore = await City.create({ name: 'Bangalore', state: karnataka._id, pincode: '560001' });
//       const mysore = await City.create({ name: 'Mysore', state: karnataka._id, pincode: '570001' });
//       const ahmedabad = await City.create({ name: 'Ahmedabad', state: gujarat._id, pincode: '380001' });
//       const surat = await City.create({ name: 'Surat', state: gujarat._id, pincode: '395001' });

//       // Hotels
//       await Hotel.create({
//         name: 'Grand Hyatt',
//         city: mumbai._id,
//         address: 'Off Western Express Highway, Santacruz East',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 15000, max: 50000 },
//         contact: { phone: '022-12345678', email: 'info@grandhyatt.com' },
//       });

//       await Hotel.create({
//         name: 'The Taj Mahal Palace',
//         city: mumbai._id,
//         address: 'Apollo Bunder, Colaba',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Multiple Restaurants', 'Bar'],
//         priceRange: { min: 20000, max: 80000 },
//         contact: { phone: '022-22345678', email: 'info@tajhotels.com' },
//       });

//       await Hotel.create({
//         name: 'JW Marriott Pune',
//         city: pune._id,
//         address: 'Senapati Bapat Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 12000, max: 40000 },
//         contact: { phone: '020-12345678', email: 'info@jwmarriott.com' },
//       });

//       await Hotel.create({
//         name: 'Pride Hotel',
//         city: nagpur._id,
//         address: 'Wardha Road',
//         rating: 4,
//         amenities: ['Pool', 'Restaurant', 'Gym'],
//         priceRange: { min: 5000, max: 12000 },
//         contact: { phone: '0712-12345678', email: 'info@pridehotel.com' },
//       });

//       await Hotel.create({
//         name: 'Leela Palace',
//         city: bangalore._id,
//         address: 'Old Airport Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Restaurant'],
//         priceRange: { min: 18000, max: 60000 },
//         contact: { phone: '080-12345678', email: 'info@theleela.com' },
//       });

//       await Hotel.create({
//         name: 'Radisson Blu',
//         city: bangalore._id,
//         address: 'Outer Ring Road',
//         rating: 4,
//         amenities: ['Pool', 'Gym', 'Restaurant'],
//         priceRange: { min: 8000, max: 20000 },
//         contact: { phone: '080-23456789', email: 'info@radissonblu.com' },
//       });

//       await Hotel.create({
//         name: 'Royal Orchid',
//         city: mysore._id,
//         address: 'Brindavan Extension',
//         rating: 4,
//         amenities: ['Restaurant', 'Swimming Pool', 'Gym'],
//         priceRange: { min: 6000, max: 15000 },
//         contact: { phone: '0821-12345678', email: 'info@royalorchid.com' },
//       });

//       await Hotel.create({
//         name: 'Hyatt Regency',
//         city: ahmedabad._id,
//         address: 'Ashram Road',
//         rating: 5,
//         amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'],
//         priceRange: { min: 9000, max: 25000 },
//         contact: { phone: '079-12345678', email: 'info@hyattahmedabad.com' },
//       });

//       await Hotel.create({
//         name: 'The Gateway Hotel',
//         city: surat._id,
//         address: 'Ghod Dod Road',
//         rating: 4,
//         amenities: ['Restaurant', 'Pool', 'Business Center'],
//         priceRange: { min: 7000, max: 18000 },
//         contact: { phone: '0261-12345678', email: 'info@gateway.com' },
//       });

//       // Locations
//       await Location.create({ state: 'Maharashtra', city: 'Mumbai' });
//       await Location.create({ state: 'Maharashtra', city: 'Pune' });
//       await Location.create({ state: 'Karnataka', city: 'Bangalore' });
//       await Location.create({ state: 'Gujarat', city: 'Ahmedabad' });

//       console.log('Data seeding completed');
//     }
//   } catch (err) {
//     console.error('Error seeding data:', err);
//   }
// };

// // Call the seed function (comment out in production)
// seedData();

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API available at http://localhost:${PORT}`);
// });

// module.exports = { app, State, City, Hotel, Location };
// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/location-manager", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Schemas
// const stateSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   code: { type: String, required: true, unique: true },
//   isActive: { type: Boolean, default: true },
// });
// const citySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
//   isActive: { type: Boolean, default: true },
// });
// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
//   address: String,
//   rating: Number,
//   amenities: [String],
//   priceRange: { min: Number, max: Number },
//   contact: { phone: String, email: String },
//   isActive: { type: Boolean, default: true },
// });
// const locationSchema = new mongoose.Schema({
//   state: { type: String, required: true },
//   city: { type: String, required: true },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const State = mongoose.model("State", stateSchema);
// const City = mongoose.model("City", citySchema);
// const Hotel = mongoose.model("Hotel", hotelSchema);
// const Location = mongoose.model("Location", locationSchema);

// // State Routes
// app.get("/api/states", async (req, res) => {
//   const states = await State.find();
//   res.json(states);
// });
// app.post("/api/states/add", async (req, res) => {
//   const state = new State(req.body);
//   await state.save();
//   res.json(state);
// });
// app.put("/api/states/:id", async (req, res) => {
//   const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(state);
// });
// app.delete("/api/states/:id", async (req, res) => {
//   await State.findByIdAndDelete(req.params.id);
//   res.json({ message: "State deleted" });
// });
// app.patch("/api/states/:id/softdelete", async (req, res) => {
//   await State.findByIdAndUpdate(req.params.id, { isActive: false });
//   res.json({ message: "State deactivated" });
// });
// app.patch("/api/states/:id/activate", async (req, res) => {
//   await State.findByIdAndUpdate(req.params.id, { isActive: true });
//   res.json({ message: "State activated" });
// });

// // City Routes
// app.get("/api/states/:stateId/cities", async (req, res) => {
//   const cities = await City.find({ state: req.params.stateId });
//   res.json(cities);
// });
// app.post("/api/cities/add", async (req, res) => {
//   const city = new City(req.body);
//   await city.save();
//   res.json(city);
// });
// app.put("/api/cities/:id", async (req, res) => {
//   const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(city);
// });
// app.delete("/api/cities/:id", async (req, res) => {
//   await City.findByIdAndDelete(req.params.id);
//   res.json({ message: "City deleted" });
// });
// app.patch("/api/cities/:id/softdelete", async (req, res) => {
//   await City.findByIdAndUpdate(req.params.id, { isActive: false });
//   res.json({ message: "City deactivated" });
// });
// app.patch("/api/cities/:id/activate", async (req, res) => {
//   await City.findByIdAndUpdate(req.params.id, { isActive: true });
//   res.json({ message: "City activated" });
// });

// // Hotel Routes
// app.get("/api/cities/:cityId/hotels", async (req, res) => {
//   const hotels = await Hotel.find({ city: req.params.cityId });
//   res.json(hotels);
// });
// app.post("/api/hotels/add", async (req, res) => {
//   const hotel = new Hotel(req.body);
//   await hotel.save();
//   res.json(hotel);
// });
// app.put("/api/hotels/:id", async (req, res) => {
//   const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(hotel);
// });
// app.delete("/api/hotels/:id", async (req, res) => {
//   await Hotel.findByIdAndDelete(req.params.id);
//   res.json({ message: "Hotel deleted" });
// });
// app.patch("/api/hotels/:id/softdelete", async (req, res) => {
//   await Hotel.findByIdAndUpdate(req.params.id, { isActive: false });
//   res.json({ message: "Hotel deactivated" });
// });
// app.patch("/api/hotels/:id/activate", async (req, res) => {
//   await Hotel.findByIdAndUpdate(req.params.id, { isActive: true });
//   res.json({ message: "Hotel activated" });
// });

// // Location Routes
// app.get("/locations/all", async (req, res) => {
//   const locations = await Location.find();
//   res.json(locations);
// });
// app.post("/locations/add", async (req, res) => {
//   const location = new Location(req.body);
//   await location.save();
//   res.json(location);
// });
// app.put("/locations/:id", async (req, res) => {
//   const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(location);
// });
// app.delete("/locations/:id", async (req, res) => {
//   await Location.findByIdAndDelete(req.params.id);
//   res.json({ message: "Location deleted" });
// });
// app.patch("/locations/:id/softdelete", async (req, res) => {
//   await Location.findByIdAndUpdate(req.params.id, { isActive: false });
//   res.json({ message: "Location deactivated" });
// });
// app.patch("/locations/:id/activate", async (req, res) => {
//   await Location.findByIdAndUpdate(req.params.id, { isActive: true });
//   res.json({ message: "Location activated" });
// });

// // Error Handling
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//     return res.status(400).json({ message: "Invalid JSON payload" });
//   }
//   next(err);
// });

// app.listen(6969, () => {
//   console.log("Server running on port 6969");
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const StateRoute = require('./routes/StateRoute')
const CityRoute = require('./routes/CityRoute')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/location-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
// const stateSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   code: { type: String, required: true, unique: true },
//   isActive: { type: Boolean, default: true },
// });
// const citySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
//   isActive: { type: Boolean, default: true },
// });
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  address: String,
  rating: Number,
  amenities: [String],
  priceRange: { min: Number, max: Number },
  contact: { phone: String, email: String },
  isActive: { type: Boolean, default: true },
});
 

// const State = mongoose.model("State", stateSchema);
// const City = mongoose.model("City", citySchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
 

// State Routes
// app.get("/api/states", async (req, res) => {
//   try {
//     const states = await State.find();
//     res.json(states);
//   } catch (err) {
//     console.error("GET /api/states - Error:", err);
//     res.status(500).json({ message: "Failed to fetch states" });
//   }
// });
// app.post("/api/states/add", async (req, res) => {
//   try {
//     const state = new State(req.body);
//     await state.save();
//     res.json(state);
//   } catch (err) {
//     console.error("POST /api/states/add - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to add state" });
//   }
// });
// app.put("/api/states/:id", async (req, res) => {
//   try {
//     const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!state) return res.status(404).json({ message: "State not found" });
//     res.json(state);
//   } catch (err) {
//     console.error("PUT /api/states/:id - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to update state" });
//   }
// });
// app.delete("/api/states/:id", async (req, res) => {
//   try {
//     const state = await State.findByIdAndDelete(req.params.id);
//     if (!state) return res.status(404).json({ message: "State not found" });
//     res.json({ message: "State deleted" });
//   } catch (err) {
//     console.error("DELETE /api/states/:id - Error:", err);
//     res.status(500).json({ message: "Failed to delete state" });
//   }
// });
// app.patch("/api/states/:id/softdelete", async (req, res) => {
//   try {
//     const state = await State.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
//     if (!state) return res.status(404).json({ message: "State not found" });
//     res.json({ message: "State deactivated" });
//   } catch (err) {
//     console.error("PATCH /api/states/:id/softdelete - Error:", err);
//     res.status(500).json({ message: "Failed to deactivate state" });
//   }
// });
// app.patch("/api/states/:id/activate", async (req, res) => {
//   try {
//     const state = await State.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
//     if (!state) return res.status(404).json({ message: "State not found" });
//     res.json({ message: "State activated" });
//   } catch (err) {
//     console.error("PATCH /api/states/:id/activate - Error:", err);
//     res.status(500).json({ message: "Failed to activate state" });
//   }
// });

// City Routes
app.use("/api", StateRoute);
app.use("/api", CityRoute);

// app.get("/api/states/:stateId/cities", async (req, res) => {
//   try {
//     const cities = await City.find({ state: req.params.stateId }).populate("state");
//     res.json(cities);
//   } catch (err) {
//     console.error("GET /api/states/:stateId/cities - Error:", err);
//     res.status(500).json({ message: "Failed to fetch cities" });
//   }
// });
// app.post("/api/cities/add", async (req, res) => {
//   try {
//     const city = new City(req.body);
//     await city.save();
//     const populatedCity = await City.findById(city._id).populate("state");
//     res.json(populatedCity);
//   } catch (err) {
//     console.error("POST /api/cities/add - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to add city" });
//   }
// });
// app.put("/api/cities/:id", async (req, res) => {
//   try {
//     const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("state");
//     if (!city) return res.status(404).json({ message: "City not found" });
//     res.json(city);
//   } catch (err) {
//     console.error("PUT /api/cities/:id - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to update city" });
//   }
// });
// app.delete("/api/cities/:id", async (req, res) => {
//   try {
//     const city = await City.findByIdAndDelete(req.params.id);
//     if (!city) return res.status(404).json({ message: "City not found" });
//     res.json({ message: "City deleted" });
//   } catch (err) {
//     console.error("DELETE /api/cities/:id - Error:", err);
//     res.status(500).json({ message: "Failed to delete city" });
//   }
// });
// app.patch("/api/cities/:id/softdelete", async (req, res) => {
//   try {
//     const city = await City.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
//     if (!city) return res.status(404).json({ message: "City not found" });
//     res.json({ message: "City deactivated" });
//   } catch (err) {
//     console.error("PATCH /api/cities/:id/softdelete - Error:", err);
//     res.status(500).json({ message: "Failed to deactivate city" });
//   }
// });
// app.patch("/api/cities/:id/activate", async (req, res) => {
//   try {
//     const city = await City.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
//     if (!city) return res.status(404).json({ message: "City not found" });
//     res.json({ message: "City activated" });
//   } catch (err) {
//     console.error("PATCH /api/cities/:id/activate - Error:", err);
//     res.status(500).json({ message: "Failed to activate city" });
//   }
// });

// // Hotel Routes
// app.get("/api/cities/:cityId/hotels", async (req, res) => {
//   try {
//     const hotels = await Hotel.find({ city: req.params.cityId }).populate({
//       path: "city",
//       populate: { path: "state" },
//     });
//     res.json(hotels);
//   } catch (err) {
//     console.error("GET /api/cities/:cityId/hotels - Error:", err);
//     res.status(500).json({ message: "Failed to fetch hotels" });
//   }
// });
// app.post("/api/hotels/add", async (req, res) => {
//   try {
//     const hotel = new Hotel(req.body);
//     await hotel.save();
//     const populatedHotel = await Hotel.findById(hotel._id).populate({
//       path: "city",
//       populate: { path: "state" },
//     });
//     res.json(populatedHotel);
//   } catch (err) {
//     console.error("POST /api/hotels/add - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to add hotel" });
//   }
// });
// app.put("/api/hotels/:id", async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
//       path: "city",
//       populate: { path: "state" },
//     });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.json(hotel);
//   } catch (err) {
//     console.error("PUT /api/hotels/:id - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to update hotel" });
//   }
// });
// app.delete("/api/hotels/:id", async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndDelete(req.params.id);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.json({ message: "Hotel deleted" });
//   } catch (err) {
//     console.error("DELETE /api/hotels/:id - Error:", err);
//     res.status(500).json({ message: "Failed to delete hotel" });
//   }
// });
// app.patch("/api/hotels/:id/softdelete", async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.json({ message: "Hotel deactivated" });
//   } catch (err) {
//     console.error("PATCH /api/hotels/:id/softdelete - Error:", err);
//     res.status(500).json({ message: "Failed to deactivate hotel" });
//   }
// });
// app.patch("/api/hotels/:id/activate", async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     res.json({ message: "Hotel activated" });
//   } catch (err) {
//     console.error("PATCH /api/hotels/:id/activate - Error:", err);
//     res.status(500).json({ message: "Failed to activate hotel" });
//   }
// });

// // Location Routes
// app.get("/locations/all", async (req, res) => {
//   try {
//     const locations = await Location.find();
//     res.json(locations);
//   } catch (err) {
//     console.error("GET /locations/all - Error:", err);
//     res.status(500).json({ message: "Failed to fetch locations" });
//   }
// });
// app.post("/locations/add", async (req, res) => {
//   try {
//     const location = new Location(req.body);
//     await location.save();
//     res.json(location);
//   } catch (err) {
//     console.error("POST /locations/add - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to add location" });
//   }
// });
// app.put("/locations/:id", async (req, res) => {
//   try {
//     const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!location) return res.status(404).json({ message: "Location not found" });
//     res.json(location);
//   } catch (err) {
//     console.error("PUT /locations/:id - Error:", err);
//     res.status(400).json({ message: err.message || "Failed to update location" });
//   }
// });
// app.delete("/locations/:id", async (req, res) => {
//   try {
//     const location = await Location.findByIdAndDelete(req.params.id);
//     if (!location) return res.status(404).json({ message: "Location not found" });
//     res.json({ message: "Location deleted" });
//   } catch (err) {
//     console.error("DELETE /locations/:id - Error:", err);
//     res.status(500).json({ message: "Failed to delete location" });
//   }
// });
// app.patch("/locations/:id/softdelete", async (req, res) => {
//   try {
//     const location = await Location.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
//     if (!location) return res.status(404).json({ message: "Location not found" });
//     res.json({ message: "Location deactivated" });
//   } catch (err) {
//     console.error("PATCH /locations/:id/softdelete - Error:", err);
//     res.status(500).json({ message: "Failed to deactivate location" });
//   }
// });
// app.patch("/locations/:id/activate", async (req, res) => {
//   try {
//     const location = await Location.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
//     if (!location) return res.status(404).json({ message: "Location not found" });
//     res.json({ message: "Location activated" });
//   } catch (err) {
//     console.error("PATCH /locations/:id/activate - Error:", err);
//     res.status(500).json({ message: "Failed to activate location" });
//   }
// });

// Error Handling
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  res.status(500).json({ message: "Internal server error" });
});

app.listen(6969, () => {
  console.log("Server running on port 6969");
});