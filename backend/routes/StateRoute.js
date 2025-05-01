 
const express = require('express');
const router = express.Router();
const stateController = require('../controller/StateController');

// GET all states
router.get('/states', stateController.getAllStates);

// POST new state
router.post('/add', stateController.addState);

// PUT update state
router.put('/:id', stateController.updateState);

// DELETE state
router.delete('/:id', stateController.deleteState);

// PATCH soft delete
router.patch('/:id/softdelete', stateController.softDeleteState);

// PATCH activate
router.patch('/:id/activate', stateController.activateState);

module.exports = router;
