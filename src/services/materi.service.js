const httpStatus = require('http-status');
const { Materi } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const path = require('path');
const {unlink} = require('fs');

/**
 * Create a materi
 * @param {Object} materiBody
 * @returns {Promise<Materi>}
 */
const createMateri = async (materiBody) => {
  let materiModel = await Materi.create(materiBody);
  return Materi.findOne({ _id: materiModel._id });
};

/**
 * Query for materis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMateris = async (filter, options) => {
  return Materi.paginate(filter, options);
};

/**
 * Query for materis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySearch = async (filter, options) => {
  return Materi.find(filter, options);
};

/**
 * Get materi by id
 * @param {ObjectId} id
 * @returns {Promise<materi>}
 */
const getMateriById = async (id) => {
  return Materi.findById(id);
};

const getImageMateri = async (materiId) => {
  const materiModel = await getMateriById(materiId);
  if (!materiModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Materi not found');
  }
  const dirname = path.resolve();
  return path.join(dirname, materiModel.image);
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Materi>}
 */
const updateMateriById = async (classId, updateBody) => {
  const materi = await Materi.findOne({ _id : classId });
  if (!materi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Materi not found');
  }
  if (updateBody['image']){
    let img = updateBody['image'];
    updateBody['image'] = img.path;
    console.log(materi.image);
    unlink(materi.image, (err) => {
      if (err) console.log('file not found');
      console.log('file was deleted');
    });
  }
  Object.assign(materi, updateBody);
  await materi.save();
  return materi;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Materi>}
 */
const deleteMateriById = async (classId) => {
  const materi = await getMateriById(classId);
  if (!materi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Materi not found');
  }
  await materi.remove();
  return materi;
};

module.exports = {
  createMateri,
  getMateriById,
  updateMateriById,
  deleteMateriById,
  querySearch,
  getImageMateri
};
