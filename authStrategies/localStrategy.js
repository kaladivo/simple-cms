import LocalStrategy from 'passport-local';
import co from 'co';
import users, {verifyPassword} from '../db/users';
import i18n from 'i18n';

export default new LocalStrategy({
    usernameField: 'email',
  },
  function(username, password, done) {
    co(function*() {
      let user = yield users.findOne({email: username});

      if(!user) 
        return done(null, false, {message: i18n.__('User with that email does not exist.')});

      if(! (yield verifyPassword(user, password))) 
        return done(null, false, {message: i18n.__('Invalid password.')});

      return done(null, user);
    }).then( val => {}, err => {
      done(err);
    });
  });