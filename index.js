import Router from 'koa-router';
import validate from 'koa-validation';
import {initSettings, getSettings} from './settings';
import i18n from 'i18n';
import flash from 'koa-connect-flash';
import session from 'koa-session';
import passport from 'koa-passport';
import KoaBody from 'koa-body';

export default function(settings) {
  initSettings(settings);
  settings = getSettings();

  i18n.configure({
    defaultLocale: settings.lang,
    directory: settings.localesDir
  });

  //All modules must be imported after settings are initialized.
  const localStrategy = require('./authStrategies/localStrategy').default;
  const {serializeUser, deserializeUser} = require('./authStrategies/userSerializer');
  const {isLoggedIn, isNotLoggedIn} = require('./routes/auth/authMiddlewares');

  //setup router
  let mainRouter = Router();
  mainRouter.use(validate());
  mainRouter.use(flash());
  mainRouter.use(passport.initialize());
  mainRouter.use(passport.session());
  mainRouter.use(KoaBody());



  //setup passport
  passport.use(localStrategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);


  //Setup error handling
  mainRouter.use(function* (next) {
    try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;
      this.app.emit('error', err, this);
    }
  });

  //Routers
  const loginRouter = require('./routes/auth/loginRouter').default;
  const registerRouter = require('./routes/auth/registerRouter').default;
  const resetPasswordRouter = require('./routes/auth/resetPasswordRouter').default;

  const frontPageRouter = require('./routes/frontPageRouter').default;
  const sectionsRouter = require('./routes/sectionsRouter').default;


  mainRouter.use(settings.adminUrl, resetPasswordRouter.routes(), resetPasswordRouter.allowedMethods());
  mainRouter.use(settings.adminUrl, loginRouter.routes(), loginRouter.allowedMethods()); 
  mainRouter.use(settings.adminUrl, registerRouter.routes(), registerRouter.allowedMethods()); 

  mainRouter.use(settings.adminUrl, frontPageRouter.routes(), frontPageRouter.allowedMethods());
  mainRouter.use(settings.adminUrl, sectionsRouter.routes(), sectionsRouter.allowedMethods()); 

  return mainRouter;  
}

export {default as AddableList} from "./elements/sections/AddableList";
export {default as List} from "./elements/sections/List";
export {default as SpecificPageModel} from "./elements/sections/SpecificPageModel";
export {default as AddableModel} from "./elements/sections/AddableModel";
export {default as TextField} from "./elements/fields/TextField";
export {default as EditorField} from "./elements/fields/EditorField";