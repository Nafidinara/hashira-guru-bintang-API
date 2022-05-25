const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClass = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    title_description: Joi.string().required(),
    body_description: Joi.string().required(),
    image: Joi.string(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    isFree: Joi.boolean().required(),
    author: Joi.custom(objectId).required(),
    facilities : Joi.array()
  }),
};

const getClasses = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSearchClass = {
  body: Joi.object().keys({
    _id: Joi.alternatives().try(Joi.string(), Joi.array()),
    title: Joi.alternatives().try(Joi.string(), Joi.array()),
    category: Joi.alternatives().try(Joi.string(), Joi.array())
  }),
};

const getClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

const getImageClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

const updateClass = {
  params: Joi.object().keys({
    classId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      title_description: Joi.string(),
      body_description: Joi.string(),
      image: Joi.string(),
      category: Joi.string(),
      price: Joi.number(),
      discount: Joi.number(),
      isFree: Joi.boolean(),
      author: Joi.custom(objectId),
      facilities : Joi.array()
    })
    .min(1),
};

const deleteClass = {
  params: Joi.object().keys({
    classId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
  getSearchClass,
  getImageClass
};
