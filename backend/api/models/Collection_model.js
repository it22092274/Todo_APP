const mongoose = require('mongoose');

// Define the schema for the collection
const listGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "new collection",
        trim: true,
    },
    type: {
        type: String,
        default: "single",
        enum: ["single", "group"], // Enum for allowed values
        trim: true,
    },
    expiredate: {
        type: Date, // Use Date type for dates
        required: true,
    }
});

// Create the model from the schema
const CollectionModel = mongoose.model('Collection', listGroupSchema);

module.exports = CollectionModel;
