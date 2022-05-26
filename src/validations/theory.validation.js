const Joi = require('joi');

const createTheory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    source_file: Joi.string().required(),
    class: Joi.string().required(),
  }),
};

const getTheory = {
  query: Joi.object().keys({
    title: Joi.string().required(),
    source_file: Joi.string().required(),
    class: Joi.string().required(),
  }),
};

const getSearchTheory = {
  body: Joi.object().keys({
    _id: Joi.alternatives().try(Joi.string(), Joi.array()),
    title: Joi.string().required(),
    source_file: Joi.string().required(),
    class: Joi.string().required(),
  }),
};

const getImageTheory = {
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
};

const updateTheory = {
  params: Joi.object().keys({
    _id: Joi.string(),
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
    _id: Joi.string(),
  }),
};

module.exports = {
  createTheory,
  getTheory,
  getSearchTheory,
  getImageTheory,
  updateTheory,
  deleteTheory,
};
