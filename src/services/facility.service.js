const httpStatus = require('http-status');
const { Facility } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('./../config/logger');
const path = require('path');
const {unlink} = require('fs');

/**
 * Create a facility
 * @param {Object} facilityBody
 * @returns {Promise<Facility>}
 */
const createFacility = async (facilityBody) => {
  let facilityModel = await Facility.create(facilityBody);
  return Facility.findOne({ _id: facilityModel._id });
};

/**
 * Query for facilites
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFacilities = async (filter, options) => {
  return Facility.paginate(filter, options);
};

/**
 * Query for facilites
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySearch = async (filter, options) => {
  return Facility.find(filter, options);
};

/**
 * Get facility by id
 * @param {ObjectId} id
 * @returns {Promise<Facility>}
 */
const getFacilityById = async (id) => {
  return Facility.findById(id);
};

const getImageFacility = async (facilityId) => {
  const facilityModel = await getFacilityById(facilityId);
  if (!facilityModel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  const dirname = path.resolve();
  return path.join(dirname, facilityModel.image);
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Facility>}
 */
const updateFacilityById = async (classId, updateBody) => {
  const facility = await Facility.findOne({ _id : classId });
  if (!facility) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  if (updateBody['image']){
    let img = updateBody['image'];
    updateBody['image'] = img.path;
    console.log(facility.image);
    unlink(facility.image, (err) => {
      if (err) console.log('file not found');
      console.log('file was deleted');
    });
  }
  Object.assign(facility, updateBody);
  await facility.save();
  return facility;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Facility>}
 */
const deleteFacilityById = async (classId) => {
  const facility = await getFacilityById(classId);
  if (!facility) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  await facility.remove();
  return facility;
};

module.exports = {
  createFacility,
  getFacilityById,
  updateFacilityById,
  deleteFacilityById,
  querySearch,
  getImageFacility,
  queryFacilities
};
