const Joi = require('joi');

const createTheory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    source_file: Joi.string(),
    class: Joi.string().required(),
  }),
};

const createBatchTheory = {
  body: Joi.object().keys({
    batchData : Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        source_file: Joi.string(),
        class: Joi.string().required(),
      }
    ))
  }),
};

const getTheory = {
  query: Joi.object().keys({
    title: Joi.string(),
    source_file: Joi.string(),
    class: Joi.string(),
  }),
};

const getSearchTheory = {
  body: Joi.object().keys({
    _id: Joi.alternatives().try(Joi.string(), Joi.array()),
    title: Joi.string(),
    source_file: Joi.string(),
    class: Joi.string(),
  }),
};

const getFileTheory = {
  params: Joi.object().keys({
    theoryId: Joi.string(),
  }),
};

const updateTheory = {
  params: Joi.object().keys({
    theoryId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      source_file: Joi.string(),
      class: Joi.string(),
    })
    .min(1),
};

const deleteTheory = {
  params: Joi.object().keys({
    theoryId: Joi.string(),
  }),
};

module.exports = {
  createTheory,
  getTheory,
  getSearchTheory,
  getFileTheory,
  updateTheory,
  deleteTheory,
  createBatchTheory
};
