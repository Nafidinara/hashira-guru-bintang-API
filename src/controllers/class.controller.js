const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const user = await classService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classService.queryClasses(filter, options);
  res.send(result);
});

const getSearchClass = catchAsync(async (req, res) => {
  const query = req.body;
  const result = await classService.querySearch(query, {});
  res.send(result);
});

const getImageClass = catchAsync(async (req, res) => {
  const result = await classService.getImageUser(req.params.userId);
  res.sendFile(result);
});

const getClass = catchAsync(async (req, res) => {
  const user = await classService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateClass = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file;
  }
  const user = await classService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteClass = catchAsync(async (req, res) => {
  await classService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send({
    result : "Success delete"
  });
});

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
  getSearchClass,
  getImageClass
};
