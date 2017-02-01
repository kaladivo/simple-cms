import co from 'co';
import users from '../db/users';

export function serializeUser(user, done) {
  co(function*() {
    return user._id;
  }).then(val => {
    done(null, val);
  }, err => {
    done(err)
  });
}

export function deserializeUser(id, done) {
  co(function*() {
    const user = yield users.findOne({_id: id});
    if(!user) return done(null, false);
    done(null, user);
  }).then(val => {}, err => {
    done(err)
  });
}