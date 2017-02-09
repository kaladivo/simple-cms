import Router from 'koa-router';
import pug from 'pug';
import Settings from '../settings';
import i18n from 'i18n';
import passport from 'passport';
import {isLoggedIn, isNotLoggedIn} from './auth/authMiddlewares';

const settings = Settings();

let frontPageRouter = Router();

const compileFrontPage = pug.compileFile(settings.viewsDir + '/frontPage.pug');

frontPageRouter.get('/', isLoggedIn, function*(next) {
  this.body = compileFrontPage({
    user: this.req.user, 
    settings,
    loggedUser: this.req.user
  })
});

export default frontPageRouter;