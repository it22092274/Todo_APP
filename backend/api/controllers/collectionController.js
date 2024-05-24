const CollectionModel = require('../models/Collection_model.js');
const logger = require('../utils/logger.js');

// Create collection
const createCollection = async (req, res, next) => {
  const { name, type, expiredate } = req.body;

  try {
    // Validate required fields
    if (!name || !type || !expiredate) {
      logger.warn("All fields were not available in the request body");
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new collection
    const newCollection = new CollectionModel({
      name,
      type,
      expiredate,
    });

    // Save to database
    await newCollection.save();

    // Log success
    logger.info('Collection created successfully', {
      name,
      type,
      expiredate,
    });

    // Respond with success
    res.status(201).json({
      message: 'Collection created successfully',
      collection: newCollection,
    });
  } catch (error) {
    // Log error
    logger.error('Error creating collection', { error });
    // Pass error to next middleware
    next(error);
  }
};

// Display collection
const displayCollection = async (req, res, next) => {
  try {
    const collection = await CollectionModel.find();

    logger.info(`Collection fetched: ${collection}`);
    return res.status(200).json({ data: collection });
  } catch (error) {
    logger.error('Error fetching collection', { error });
    next(error);
  }
};

// Update collection metadata
const updateCollection = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      return res.status(400).json({ message: "Invalid collection" });
    }

    const collection = await CollectionModel.findById(_id);

    if (!collection) {
      return res.status(400).json({ message: "The collection does not exist" });
    }

    const { name, expiredate, type } = req.body;

    const updatedCollection = await CollectionModel.findByIdAndUpdate(
      _id,
      { name, type, expiredate },
      { new: true }
    );

    logger.info('Collection updated successfully', { updatedCollection });
    return res.status(200).json({ message: "Collection updated", data: updatedCollection });
  } catch (error) {
    logger.error('Error updating collection', { error });
    next(error);
  }
};

//delete collection 
/* this is to be define as this contain the disbanding of lists */

module.exports = { createCollection, displayCollection, updateCollection };
