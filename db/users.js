import i18n from 'i18n';
import bcrypt from 'co-bcrypt';
import {randomBytes} from 'co-crypto';

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

  const hash = yield generatePasswordHash(password);

  return yield users.insert({
    email, 
    password: hash, 
    created: new Date(), 
    data
  });
}

export function* generatePasswordHash(password) {
  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(password, salt);

  return hash;
}

export function* verifyPassword(user, password) {
  return yield bcrypt.compare(password, user.password);
}

export function* generateResetToken(email) {
  const token = (yield randomBytes(4)).toString('hex');
  let user = yield users.findOneAndUpdate({email}, {$set: {resetToken: {token, createdAt: new Date()}}});
  if(user.value === null) {
    throw new Error(i18n.__("User with that email does not exist"));
  }
  return user;
}

export default users;