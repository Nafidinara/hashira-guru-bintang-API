const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { facilityService } = require('../services');

const createFacility = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file;
  }
  const facility = await facilityService.createFacility(req.body);
  res.status(httpStatus.CREATED).send(facility);
});

const getFacilities = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await facilityService.queryFacilities(filter, options);
  res.send(result);
});

const getSearchFacility = catchAsync(async (req, res) => {
  const query = req.body;
  const result = await facilityService.querySearch(query, {});
  res.send(result);
});

const getImageFacility = catchAsync(async (req, res) => {
  const result = await facilityService.getImageFacility(req.params.facilityId);
  res.sendFile(result);
});

const getFacility = catchAsync(async (req, res) => {
  const facility = await facilityService.getFacilityById(req.params.facilityId);
  if (!facility) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  res.send(facility);
});

const updateFacility = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file.path;
  }
  const facility = await facilityService.updateFacilityById(req.params.facilityId, req.body);
  res.send(facility);
});

const deleteFacility = catchAsync(async (req, res) => {
  await facilityService.deleteFacilityById(req.params.facilityId);
  res.status(httpStatus.OK).send({
    result : "Success delete"
  });
});

module.exports = {
  createFacility,
  getFacilities,
  getFacility,
  updateFacility,
  deleteFacility,
  getSearchFacility,
  getImageFacility
};
