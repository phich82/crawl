import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const currentpath = (url) => path.dirname(fileURLToPath(url));
export const dirname = (url) => path.dirname(fileURLToPath(url)).split(path.sep).pop();

export const createJsonFile = (input, filename = 'data.json', callback = () => {}) => {
  fs.writeFile(
    filename,
    JSON.stringify(input, null, 2),
    "utf8",
    (err, result) => {
      if (typeof callback === 'function') {
        callback(err, result);
      } else if (err) {
        console.log("Could not create data => ", err);
      }
    }
  );
};

export const readJsonFile = (jsonFilePath, callback = () => {}) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      return callback(err, undefined);
    }
    try {
      return callback(undefined, JSON.parse(data));
    } catch (error) {
      return callback(error, undefined);
    }
  });
}

export const readJsonFromDir = (dirPath, callback = () => {}, ignoreError = false) => {
  const jsonsInDir = fs.readdirSync(dirPath).filter(file => path.extname(file) === '.json');
  jsonsInDir.forEach((file, index) => {
    try {
      const fileData = fs.readFileSync(path.join(dirPath, file));
      callback(undefined, JSON.parse(fileData.toString()), index);
    } catch (err) {
      if (!ignoreError) {
        callback(err, undefined);
      }
    }
  });
}
