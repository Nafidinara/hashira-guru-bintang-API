const Joi = require('joi');

const createFacility = {
  body: Joi.object().keys({
    image: Joi.string(),
    description: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

const getFacility = {
  query: Joi.object().keys({
    image: Joi.string(),
    description: Joi.string(),
    title: Joi.string(),
  }),
};

const getSearchFacility = {
  body: Joi.object().keys({
    _id: Joi.alternatives().try(Joi.string(), Joi.array()),
    image: Joi.alternatives().try(Joi.string(), Joi.array()),
    title: Joi.alternatives().try(Joi.string(), Joi.array()),
    description: Joi.alternatives().try(Joi.string(), Joi.array()),
  }),
};

const getImageFacility = {
  params: Joi.object().keys({
    facilityId: Joi.string(),
  }),
};

const updateFacility = {
  params: Joi.object().keys({
    facilityId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteFacility = {
  params: Joi.object().keys({
    facilityId: Joi.string(),
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
