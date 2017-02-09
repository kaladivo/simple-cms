import Router from 'koa-router';
import pug from 'pug';
import i18n from 'i18n';

import Settings from '../../settings';
import users, {createUser} from '../../db/users';
import inviteTokens from '../../db/inviteTokens';
import {isNotLoggedIn} from './authMiddlewares';

const settings = Settings();

let registerRouter = Router();
registerRouter.use(isNotLoggedIn);

//validate invite token
registerRouter.use(function*(next ) {
  //If no user registered then no token is required.
  if((yield users.count({})) == 0) return yield next;

  const {inviteToken} = this.request.query;
  let tokenObject = yield inviteTokens.findOne({token: inviteToken});

  if(!tokenObject) this.throw("Invalid invite token", 403)

  //If user is already registered
  if((yield users.count({email: tokenObject.forEmail})) > 0) {
    this.flash('message', i18n.__('User already registered'));
    this.redirect(settings.adminUrl + "/login");
    return;
  }

  this.inviteToken = tokenObject;

  return yield next;
});

const compileRegisterPage = pug.compileFile(settings.viewsDir + '/registerPage.pug');

registerRouter.get('/', function*() {
  if(this.inviteToken) 
    this.body = compileRegisterPage({email: this.inviteToken.forEmail, disableEmailInput: true});
  else
    this.body = compileRegisterPage({});
});

registerRouter.post('/', validateRegistration, registerUser);

function* validateRegistration(next) {

  if(this.inviteToken) {
    this.request.body.email = this.inviteToken.forEmail;
  }

  yield this.validateBody({
    email: 'required|email',
    password: 'required|minLength:6'
  }, {
    'email.email': i18n.__('Enter valid email'),
    'email.required': i18n.__('Enter valid email'),
    'password.required': i18n.__('Password is required'),
    'password.minLength': i18n.__('Password must be at least 6 characters long')
  }, {
    before: {
      email: 'lowercase',
    }
  }); 

  if(this.validationErrors) {
    let errors = this.validationErrors.map(value => value[Object.keys(value)[0]].message);
    this.body = compileRegisterPage({errors, email: this.request.body.email});
    return;
  }

  const {password, passwordCheck} = this.request.body;
  if(password !== passwordCheck) {
    this.body = compileRegisterPage({errors: [i18n.__('Passwords do not match')], email: this.request.body.email});
    return;
  }

  return yield next;
}

function* registerUser(next) {
  const {email, password} = this.request.body;
  try {
    const createdUser = yield createUser(email, password);
    this.flash('message', i18n.__('Successfully registered. Please login.'));
    this.redirect(settings.adminUrl + '/login');
  }catch(err) {
    this.body = compileRegisterPage({errors: [err.message]});
  }
}

export default registerRouter;