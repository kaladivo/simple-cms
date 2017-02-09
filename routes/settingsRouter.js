import Router from 'koa-router';
import pug from 'pug';
import Settings from '../settings';
import i18n from 'i18n';
import passport from 'passport';
import {isLoggedIn} from './auth/authMiddlewares';
import users, {generatePasswordHash} from '../db/users';
import {createInviteToken} from '../db/inviteTokens';
import emailTransporter from '../emailTransporter';

const settings = Settings();

let settingsRouter = Router();

const compileFile = pug.compileFile(settings.viewsDir + '/settingsPage.pug');
const compileInviteEmail = pug.compileFile(settings.viewsDir + '/emailTemplates/inviteEmail.pug');
settingsRouter.use(isLoggedIn);

settingsRouter.get('/', function*(next) {
  let fetchedUsers = yield users.find({});
  this.body = compileFile({
    settings,
    users: fetchedUsers,
    currentUser: this.req.user,
    messages: this.flash('message'),
    errors: this.flash('error'),
    loggedUser: this.req.user
  });
});

settingsRouter.post('/inviteUser', function*(next) {
  const {email} = this.request.body;
  if(!email) {
    this.flash('error', i18n.__('Please fill mail'));
    this.redirect(settings.adminUrl + '/settings');
    return;
  }

  if((yield users.count({email})) > 0) {
    this.flash('error', i18n.__('Email already in database'));
    this.redirect(settings.adminUrl + '/settings');
    return;
  }

  const inviteToken = yield createInviteToken(email);
  let emailHtml = compileInviteEmail({settings, inviteToken});


  let message = {
    from: settings.emailAddress,
    to: email,
    subject: i18n.__("Admin invitation"),
    html: emailHtml
  }

  emailTransporter.sendMail(message, (err, info) => {});

  this.flash('message', i18n.__("User invited"));
  this.redirect(settings.adminUrl + "/settings");
});

settingsRouter.post('/changePassword', function*(next) {
  yield this.validateBody({
    password: 'required|minLength:6'
  },{
    'password.required': i18n.__('Password is required'),
    'password.minLength': i18n.__('Password must be at least 6 characters long')
  });

  if(this.validationErrors) {
    let errors = this.validationErrors.map(value => value[Object.keys(value)[0]].message);
    this.flash('error', errors);
    this.redirect(settings.adminUrl + "/settings");
    return;
  }

  const {password, passwordCheck} = this.request.body;
  if(password != passwordCheck) {
    this.flash('error', i18n.__("passwords do not match"));
    this.redirect(settings.adminUrl + "/settings");
    return;
  }

  let passwordHash = yield generatePasswordHash(password);
  yield users.update(this.req.user._id, {'$set': {password: passwordHash}});

  this.flash('message', i18n.__("password changed"));
  this.redirect(settings.adminUrl + "/settings");
});

settingsRouter.get('/removeUser/:userId', function*(next) {
  const {userId} = this.params;
  if(userId == this.req.user._id.toString()) {
    console.log(userId);
    this.flash('error', i18n.__("You can not remove yourself"));
    this.redirect(settings.adminUrl + "/settings");
    return;
  }
  let res = yield users.remove(userId);
  this.flash('message', i18n.__("User removed"));
  this.redirect(settings.adminUrl + "/settings");
});

export default settingsRouter;