import Router from 'koa-router';
import pug from 'pug';
import Settings from '../../settings';
import i18n from 'i18n';
import passport from 'passport';
import {isLoggedIn, isNotLoggedIn} from './authMiddlewares';
import users, {generateResetToken, generatePasswordHash} from '../../db/users';
import emailTransporter from '../../emailTransporter';

const settings = Settings();

let resetPasswordRouter = Router();
// resetPasswordRouter.use(KoaBody());

const compileRequestResetPasswordPage = pug.compileFile(settings.viewsDir + '/requestResetPasswordPage.pug');
const compileResetPasswordPage = pug.compileFile(settings.viewsDir + '/resetPasswordPage.pug');
const compileResetPasswordEmail = pug.compileFile(settings.viewsDir + '/emailTemplates/resetPasswordEmail.pug');

resetPasswordRouter.get("/", function*(next) {
  let errors = this.flash('errors');
  this.body = compileRequestResetPasswordPage({settings,errors});
});
resetPasswordRouter.get("/:token", validateTokenInUrl, function*(next) {
  this.body = compileResetPasswordPage({settings});
});
resetPasswordRouter.post("/", validateRequireReset, requestResetPassword);
resetPasswordRouter.post("/:token", validateTokenInUrl, validateReset, resetPassword);

function* validateReset(next) {
  yield this.validateBody({
    password: 'required|minLength:6'
  }, {
    'password.required': i18n.__('Password is required'),
    'password.minLength': i18n.__('Password must be at least 6 characters long')
  });

  if(this.validationErrors) {
    let errors = this.validationErrors.map(value => value[Object.keys(value)[0]].message);
    this.body = compileResetPasswordPage({settings,errors});
    return;
  }
  
  const {password, passwordCheck} = this.request.body;
  if(password !== passwordCheck) {
    this.body = compileResetPasswordPage({settings, errors: [i18n.__('passwords do not match')]});
    return;
  }
  return yield next;
}

function* validateRequireReset(next) {
  yield this.validateBody({
    'email': 'required|email'
  },{
    'email.email': i18n.__('Enter valid email'),
    'email.required': i18n.__('Enter valid email'),
  },{
    before: {
      email: 'lowercase'
    }
  });

  if(this.validationErrors) {
    let errors = this.validationErrors.map(value => value[Object.keys(value)[0]].message);
    this.body = compileRequestResetPasswordPage({settings, errors: errors});
    return;
  }

  yield next;
}

function* requestResetPassword(next) {
  try {
    let user = yield generateResetToken(this.request.body.email);
    createAndSendResetMail(user);

    this.flash('message', i18n.__("Reset token was send please check your email."));
    this.redirect(settings.adminUrl + '/login');
  } catch (err) {
    this.body = compileRequestResetPasswordPage({settings, errors: [err.message]});
  }
}

function* resetPassword(next) {
  const hash = yield generatePasswordHash(this.request.body.password);

  let mustBeGreaterThan = new Date();
  mustBeGreaterThan.setMinutes(mustBeGreaterThan.getMinutes() - 10);

  const user = yield users.findOneAndUpdate({
      "resetToken.token": this.params.token,
      "resetToken.createdAt": {$gte: mustBeGreaterThan}
    }, {$set: {password: hash}, $unset: {resetToken: 1}}
  );

  this.flash("message", i18n.__("Password was successfully changed. You can now login."))
  this.redirect(settings.adminUrl + "/login");
}

function createAndSendResetMail(user) {
  var resetUrl = settings.siteUrl + "/admin/resetPassword/" + user.resetToken.token;
  let message = {
    from: settings.emailAddress,
    to: user.email,
    subject: i18n.__("Password reset"),
    html: compileResetPasswordEmail({settings, resetUrl})
  }

  emailTransporter.sendMail(message, (err, info) => {});
}

function* validateTokenInUrl(next) {
  let mustBeGreaterThan = new Date();
  mustBeGreaterThan.setMinutes(mustBeGreaterThan.getMinutes() - 10);

  const userExist = (yield users.count({
      "resetToken.token": this.params.token,
      "resetToken.createdAt": {$gte: mustBeGreaterThan}
    }
  )) > 0;

  if(!userExist) {
    this.flash("errors", i18n.__("Url is not valid, please request reset again."));
    this.redirect(settings.adminUrl + "/resetPassword");
    return;
  }

  yield next;
}

export default resetPasswordRouter;