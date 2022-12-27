import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';
import request from 'request';

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

export const readJsonFileSync = (jsonFilePath, options = null) => {
  return JSON.parse(fs.readFileSync(jsonFilePath, options));
}

export const readJsonFile = (jsonFilePath, callback = () => {}) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {;
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
      const filePath = path.join(dirPath, file);
      const fileData = fs.readFileSync(filePath);
      callback(undefined, JSON.parse(fileData.toString()), index, filePath);
    } catch (err) {
      if (!ignoreError) {
        callback(err, undefined);
      }
    }
  });
};

export const emptyDir = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Directory [${dir}] not found.`)
    return false;
  }
  fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`, { force: true }));
  return true;
}

export const deleteDirSync = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Directory [${dir}] not found.`)
    return false;
  }

  fs.rmSync(dir, { recursive: true, force: true });
  return true;
};

export const ensureDirSync = (dir) => {
  if (!fs.existsSync(dir)) {
    return fs.mkdirSync(dir, { recursive: true, mode: 0o777 });
  }
};;

export const existsFile = (file) => {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true
  } catch (err) {
    return false
  }
}

export const download = (uri, filename = 'download', storePath = './') => {
  if (storePath != './') {
    ensureDirSync(storePath);
  }
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(`${storePath}/${filename}`)).on('close', resolve);
    });
  });
};

export const chunk = (arr, n) => [...Array(Math.ceil(arr.length / n))].map((_, i) => arr.slice(n*i, n + n*i));
