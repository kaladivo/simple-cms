import Router from 'koa-router';
import pug from 'pug';
import Settings from '../../settings';
import i18n from 'i18n';
import passport from 'passport';
import {isLoggedIn, isNotLoggedIn} from './authMiddlewares';
import users from '../../db/users';

const settings = Settings();

let loginRouter = Router();
// loginRouter.use(KoaBody());

//Redirect to register page if no user registered yet
loginRouter.use(function*(next) {
  if((yield users.count()) == 0) 
    this.redirect(settings.adminUrl + "/register");
  else 
    yield next;
})

const compileLoginPage = pug.compileFile(settings.viewsDir + '/loginPage.pug');

// Display login page.
loginRouter.get('/', isNotLoggedIn, function*() {
  let args = {
    message: this.flash('message'), 
    errors: this.flash('error'), 
  };
  this.body = compileLoginPage(args);
});

// Login user.
loginRouter.post('/',
  isNotLoggedIn,
  function *(next) {
    try {
      yield next;
    } catch(e) {
      let errors = [];

      const {email, password} = this.request.body;
      if(!password) errors.push(i18n.__("Password required"));
      if(!email) errors.push(i18n.__("Email required"));
      if(password && email) errors.push(i18n.__("Bad credentials"))

      this.body = compileLoginPage({
        errors: errors,
        email: this.request.body.email
      });
    }
  },
  passport.authenticate('local', {
        successRedirect: settings.adminUrl, 
        failWithError: true
      }
    ),
  );

// logout user.
loginRouter.get('/logout', isLoggedIn, function*() {
  this.logout();
  this.flash('message', i18n.__('Logout successful.'));
  this.redirect(settings.adminUrl + '/login');
})

export default loginRouter;