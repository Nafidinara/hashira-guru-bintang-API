const httpStatus = require('http-status');
const { Class } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const path = require('path');
const {unlink} = require('fs');

/**
 * Create a class
 * @param {Object} classBody
 * @returns {Promise<Class>}
 */
const createClass = async (classBody) => {
  let classModel = await Class.create(classBody);
  return Class.findOne({ _id: classModel._id });
};

/**
 * Query for classs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClasses = async (filter, options) => {
  Object.assign(options,{populate : 'facilities, author'});
  console.log(options, filter);
  return Class.paginate(filter, options);
};

/**
 * Query for classes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySearch = async (filter, options) => {
  return Class.find(filter, options);
};

/**
 * Get class by id
 * @param {ObjectId} id
 * @returns {Promise<Class>}
 */
const getClassById = async (id) => {
  return Class.findById(id);
};

const getImageClass = async (classId) => {
  const classModel = await getClassById(classId);
  if (!classModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  const dirname = path.resolve();
  return path.join(dirname, classModel.image);
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Class>}
 */
const updateClassById = async (classId, updateBody) => {
  const classModel = await Class.findOne({ _id : classId });
  if (!classModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  if (updateBody['image']){
    let img = updateBody['image'];
    updateBody['image'] = img.path;
    console.log(classModel.image);
    unlink(classModel.image, (err) => {
      if (err) console.log('file not found');
      console.log('file was deleted');
    });
  }
  Object.assign(classModel, updateBody);
  await classModel.save();
  return classModel;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Class>}
 */
const deleteClassById = async (classId) => {
  const classModel = await getClassById(classId);
  if (!classModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  await classModel.remove();
  return classModel;
};

module.exports = {
  createClass,
  queryClasses,
  getClassById,
  updateClassById,
  deleteClassById,
  querySearch,
  getImageClass
};
