const httpStatus = require('http-status');
const { Theory } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const path = require('path');
const {unlink} = require('fs');

/**
 * Create a theory
 * @param {Object} theoryBody
 * @returns {Promise<Theory>}
 */
const createTheory = async (theoryBody) => {
  let theoryModel = await Theory.create(theoryBody);
  return Theory.findOne({ _id: theoryModel._id }).populate('class');
};

/**
 * Create a theory
 * @param {Object} theoryBody
 * @returns {Promise<Theory>}
 */
const createBatchTheory = async (theoryBody) => {
  return Theory.insertMany(theoryBody.batchData);
};

/**
 * Query for theories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTheories = async (filter, options) => {
  Object.assign(options,{populate : 'class'});
  return Theory.paginate(filter, options);
};

/**
 * Query for theories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySearch = async (filter, options) => {
  return Theory.find(filter, options).populate('class');
};

/**
 * Get theory by id
 * @param {ObjectId} id
 * @returns {Promise<Theory>}
 */
const getTheoryById = async (id) => {
  return Theory.findById(id).populate('class');
};

const getFileTheory = async (theoryId) => {
  const theoryModel = await getTheoryById(theoryId);
  if (!theoryModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theory not found');
  }
  const dirname = path.resolve();
  return path.join(dirname, theoryModel.source_file);
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Theory>}
 */
const updateTheoryById = async (classId, updateBody) => {
  const theory = await Theory.findOne({ _id : classId });
  if (!theory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theory not found');
  }
  console.log(updateBody);
  if (updateBody['source_file']){
    console.log(theory.source_file);
    unlink(theory.source_file, (err) => {
      if (err) console.log('file not found');
      console.log('file was deleted');
    });
  }
  Object.assign(theory, updateBody);
  await theory.save();
  return theory;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Theory>}
 */
const deleteTheoryById = async (classId) => {
  const theory = await getTheoryById(classId);
  if (!theory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theory not found');
  }
  await theory.remove();
  return theory;
};

module.exports = {
  createTheory,
  getTheoryById,
  updateTheoryById,
  deleteTheoryById,
  querySearch,
  getFileTheory,
  queryTheories,
  createBatchTheory
};
