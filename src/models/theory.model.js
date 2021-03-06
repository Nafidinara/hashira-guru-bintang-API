/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const theorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    source_file: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
theorySchema.plugin(toJSON);
theorySchema.plugin(paginate);

const Theory = mongoose.model('Theory', theorySchema);

module.exports = Theory;
