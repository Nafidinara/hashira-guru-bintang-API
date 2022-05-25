/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    title_description: {
      type: String,
      required: true,
      trim: true,
    },
    body_description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      trim: true,
      required: true,
    },
    facilities: [{
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref : 'Facility'
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
classSchema.plugin(toJSON);
classSchema.plugin(paginate);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
