const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { facilityService } = require('../services');

const createFacility = catchAsync(async (req, res) => {
  const user = await facilityService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getFacilities = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
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
  const result = await facilityService.getImageUser(req.params.userId);
  res.sendFile(result);
});

const getFacility = catchAsync(async (req, res) => {
  const user = await facilityService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateFacility = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file;
  }
  const user = await facilityService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteFacility = catchAsync(async (req, res) => {
  await facilityService.deleteUserById(req.params.userId);
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
