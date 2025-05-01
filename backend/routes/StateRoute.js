 
const express = require('express');
const router = express.Router();
const stateController = require('../controller/StateController');

// GET all states
router.get('/states', stateController.getAllStates);

// POST new state
router.post('/states/add', stateController.addState);

// PUT update state
router.put('/states/:id', stateController.updateState);

// DELETE state
router.delete('/states/:id', stateController.deleteState);

// PATCH soft delete
router.patch('/states/:id/softdelete', stateController.softDeleteState);

// PATCH activate
router.patch('/states/:id/activate', stateController.activateState);

module.exports = router;
