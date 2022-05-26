const Joi = require('joi');

const createFacility = {
  body: Joi.object().keys({
    image: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getFacility = {
  query: Joi.object().keys({
    image: Joi.string(),
    description: Joi.string(),
  }),
};

const getSearchFacility = {
  body: Joi.object().keys({
    _id: Joi.alternatives().try(Joi.string(), Joi.array()),
    image: Joi.alternatives().try(Joi.string(), Joi.array()),
    description: Joi.alternatives().try(Joi.string(), Joi.array()),
  }),
};

const getImageFacility = {
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
};

const updateFacility = {
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      image: Joi.string().required(),
      description: Joi.string().required(),
    })
    .min(1),
};

const deleteFacility = {
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
};

module.exports = {
  createFacility,
  getFacility,
  getSearchFacility,
  getImageFacility,
  updateFacility,
  deleteFacility,
};
