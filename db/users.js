import i18n from 'i18n';
import bcrypt from 'co-bcrypt';

import {getSettings} from '../settings'
const settings = getSettings();
const db = settings.db;

let users = db.get('users') //TODO move collection name to the settings.

/**
 * Will insert new user to the database. Throws an error if user does not exist.
 * @param  {String} email    User's email.
 * @param  {String} password User's password. Will be stored as a hash.
 * @param  {Object} data     Additional data to store with the user. 
 * @return {[generator function]}         
 */
export function* createUser(email, password, data = {}) {
  if(yield users.findOne({email})) 
    throw new Error(i18n.__('User with that email already exists'));

  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(password, salt);

  return yield users.insert({
    email, 
    password: hash, 
    created: new Date(), 
    data
  });
}

export function* verifyPassword(user, password) {
  return yield bcrypt.compare(password, user.password);
}

export default users;