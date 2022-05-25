/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const facilitySchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
facilitySchema.plugin(toJSON);

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
