/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const facilitySchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
      trim: true,
    },
    title: {
      type: String,
      required: false,
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
facilitySchema.plugin(paginate);

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
