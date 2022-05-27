const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { theoryService } = require('../services');

const createTheory = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file;
  }
  const theory = await theoryService.createTheory(req.body);
  res.status(httpStatus.CREATED).send(theory);
});

const getTheories = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await theoryService.queryTheories(filter, options);
  res.send(result);
});

const getSearchTheory = catchAsync(async (req, res) => {
  const query = req.body;
  const result = await theoryService.querySearch(query, {});
  res.send(result);
});

const getFileTheory = catchAsync(async (req, res) => {
  const result = await theoryService.getFileTheory(req.params.theoryId);
  res.sendFile(result);
});

const getTheory = catchAsync(async (req, res) => {
  const theory = await theoryService.getTheoryById(req.params.theoryId);
  if (!theory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theory not found');
  }
  res.send(theory);
});

const updateTheory = catchAsync(async (req, res) => {
  if (req.file){
    req.body.image = req.file.path;
  }
  const theory = await theoryService.updateTheoryById(req.params.theoryId, req.body);
  res.send(theory);
});

const deleteTheory = catchAsync(async (req, res) => {
  await theoryService.deleteTheoryById(req.params.theoryId);
  res.status(httpStatus.OK).send({
    result : "Success delete"
  });
});

module.exports = {
  createTheory,
  getTheories,
  getTheory,
  updateTheory,
  deleteTheory,
  getSearchTheory,
  getFileTheory
};
