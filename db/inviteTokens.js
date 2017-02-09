import i18n from 'i18n';
import bcrypt from 'co-bcrypt';
import {randomBytes} from 'co-crypto';

import {getSettings} from '../settings'
const settings = getSettings();
const db = settings.db;

let inviteTokens = db.get('inviteTokens');

export function* createInviteToken(forEmail) {
  const token = (new Date()).getTime() + (yield randomBytes(4)).toString('hex');
  yield inviteTokens.insert({forEmail, token});

  return token;
}

export default inviteTokens;