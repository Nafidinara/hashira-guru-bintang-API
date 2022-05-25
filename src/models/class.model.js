/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

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
      required: true,
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
    status: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      ref: 'User',
      trim: true,
      required: true,
    },
    facility: {
      type: String,
      ref: 'Facility',
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
classSchema.plugin(toJSON);

const Review = mongoose.model('Review', classSchema);

module.exports = Review;
