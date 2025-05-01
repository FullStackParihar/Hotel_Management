const State = require('../model/StateModel');


exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    console.error("GET /api/states - Error:", err);
    res.status(500).json({ message: "Failed to fetch states" });
  }
};

exports.addState = async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.json(state);
  } catch (err) {
    console.error("POST /api/states/add - Error:", err);
    res.status(400).json({ message: err.message || "Failed to add state" });
  }
};

exports.updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json(state);
  } catch (err) {
    console.error("PUT /api/states/:id - Error:", err);
    res.status(400).json({ message: err.message || "Failed to update state" });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json({ message: "State deleted" });
  } catch (err) {
    console.error("DELETE /api/states/:id - Error:", err);
    res.status(500).json({ message: "Failed to delete state" });
  }
};

exports.softDeleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json({ message: "State deactivated" });
  } catch (err) {
    console.error("PATCH /api/states/:id/softdelete - Error:", err);
    res.status(500).json({ message: "Failed to deactivate state" });
  }
};

exports.activateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json({ message: "State activated" });
  } catch (err) {
    console.error("PATCH /api/states/:id/activate - Error:", err);
    res.status(500).json({ message: "Failed to activate state" });
  }
};
