const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const _class = await classService.createClass(req.body);
  res.status(httpStatus.CREATED).send(_class);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
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
  const result = await classService.getImageClass(req.params.classId);
  res.sendFile(result);
});

const getClass = catchAsync(async (req, res) => {
  const _class = await classService.getClassById(req.params.classId);
  if (!_class) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  res.send(_class);
});

const updateClass = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file;
  }
  const _class = await classService.updateClassById(req.params.classId, req.body);
  res.send(_class);
});

const deleteClass = catchAsync(async (req, res) => {
  await classService.deleteClassById(req.params.classId);
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
