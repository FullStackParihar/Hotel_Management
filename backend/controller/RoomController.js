const Room = require("../model/RoomModel");
const Hotel = require("../model/HotelModel");
 

exports.getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId }).populate("hotel");
    res.json(rooms);
  } catch (err) {
    console.error("GET /api/hotels/:hotelId/rooms - Error:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.body.hotel);
    if (!hotel) {
      return res.status(400).json({ message: "Invalid hotel ID" });
    }
    const room = new Room({
      ...req.body,
      amenities: req.body.amenities ? req.body.amenities.filter(Boolean) : [],
      images: req.body.images || [],
    });
    await room.save();
    const populatedRoom = await Room.findById(room._id).populate("hotel");
    res.json(populatedRoom);
  } catch (err) {
    console.error("POST /api/rooms/add - Error:", err);
    res.status(400).json({ message: err.message || "Failed to add room" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        amenities: req.body.amenities ? req.body.amenities.filter(Boolean) : [],
        images: req.body.images || [],
      },
      { new: true }
    ).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error("PUT /api/rooms/:id - Error:", err);
    res.status(400).json({ message: err.message || "Failed to update room" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error("DELETE /api/rooms/:id - Error:", err);
    res.status(500).json({ message: "Failed to delete room" });
  }
};

exports.softDeleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deactivated" });
  } catch (err) {
    console.error("PATCH /api/rooms/:id/softdelete - Error:", err);
    res.status(500).json({ message: "Failed to deactivate room" });
  }
};

exports.activateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room activated" });
  } catch (err) {
    console.error("PATCH /api/rooms/:id/activate - Error:", err);
    res.status(500).json({ message: "Failed to activate room" });
  }
};