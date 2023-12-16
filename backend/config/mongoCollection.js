import {dbConnection} from './mongoConnection.js';


const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};


export const users = getCollectionFn('users');
export const cpu = getCollectionFn('cpu');
export const gpu = getCollectionFn('gpu');
export const mobo = getCollectionFn('mobo');
export const psu = getCollectionFn('psu');
export const ram = getCollectionFn('ram');
export const disk = getCollectionFn('disk');
export const rooms = getCollectionFn('rooms')