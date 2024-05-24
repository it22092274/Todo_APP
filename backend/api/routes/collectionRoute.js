const express = require('express');
const { createCollection, displayCollection, updateCollection } = require('../controllers/collectionController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

// Route to create a new collection
router.post('/create', authMiddleware, createCollection);

// Route to display all collections
router.get('/display', authMiddleware, displayCollection);

// Route to update a collection
router.patch('/update/:_id', authMiddleware, updateCollection);

module.exports = router;
