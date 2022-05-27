const busboy = require('busboy');
const fs = require('fs');
const path = require('path');

const bbInit = (options) => {
  Object.assign(options, {headers : {'Content-Type' : 'multipart/form-data'}});

  return busboy(options);
}

const save = async (filepath, file, options) => {
  const bb = await bbInit(options);

  bb.on('file', (name, file, info) => {
    let fileName = new Date().valueOf() + '_' + file.originalname
    const saveTo = path.join(`src/public/assets/${filepath}`, fileName);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on('close', () => {
    console.log('done input file');
  });

  return bb;
}

module.exports = {
  save
}
