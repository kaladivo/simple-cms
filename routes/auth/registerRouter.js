import Router from 'koa-router';
import pug from 'pug';
import KoaBody from 'koa-body';
import i18n from 'i18n';

import Settings from '../../settings';
import users, {createUser} from '../../db/users';

const settings = Settings();

let registerRouter = Router();

const compileRegisterPage = pug.compileFile(settings.viewsDir + '/registerPage.pug');

registerRouter.get('/register', function*() {
  this.body = compileRegisterPage();
});

registerRouter.post('/register', validateRegistration, registerUser);

function* validateRegistration(next) {
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
  })

  if(this.validationErrors) {
    let errors = this.validationErrors.map(value => value[Object.keys(value)[0]].message);
    this.body = compileRegisterPage({errors, email: this.request.body.email});
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