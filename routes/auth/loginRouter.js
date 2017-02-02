import Router from 'koa-router';
import pug from 'pug';
import Settings from '../../settings';
import i18n from 'i18n';
import passport from 'passport';
import KoaBody from 'koa-body';
import {isLoggedIn, isNotLoggedIn} from './authMiddlewares';

const settings = Settings();

let loginRouter = Router();
// loginRouter.use(KoaBody());

const compileLoginPage = pug.compileFile(settings.viewsDir + '/loginPage.pug');

// Display login page.
loginRouter.get('/login', isNotLoggedIn, function*() {
  let args = {
    message: this.flash('message'), 
    errors: this.flash('error'), 
  };
  this.body = compileLoginPage(args);
});

// Login user.
loginRouter.post('/login',
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