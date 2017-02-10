import Router from 'koa-router';
import pug from 'pug';
import Settings from '../settings';
import i18n from 'i18n';
import passport from 'passport';
import {getSectionByUrl} from '../utils';
import {isLoggedIn, isNotLoggedIn} from './auth/authMiddlewares';

const settings = Settings();

const compileSectionPage = pug.compileFile(settings.viewsDir + '/sectionPage.pug');

let sectionsRouter = Router();

sectionsRouter.use(isLoggedIn);
sectionsRouter.use(findSection);

sectionsRouter.get(/(.*)/, function*(next) {
  let backInfo
  if(this.request.query.id || this.request.query.action == "new")
    backInfo = {url: this.section.getUrl(), title:"Back to " + this.section.title.toLowerCase()};

  this.body = compileSectionPage({
    section: this.section,
    sectionHtml: yield this.section.renderHtml(this.request, this.response),
    settings: settings,
    backInfo,
    loggedUser: this.req.user
   });
});

sectionsRouter.post(/(.*)/, function*(next) {
  let result = yield this.section.savePost(this.request, this.response);
  let sectionHtml;

  let backInfo;
  if(this.request.query.id || this.request.query.action == "new")
    backInfo = {url: this.section.getUrl(), title:"Back to " + this.section.title.toLowerCase()};
  // console.log(result);
  if(!result || result._id)
    sectionHtml = yield this.section.renderHtml(this.request, {values: result});
  else 
    sectionHtml = result;
  this.body = compileSectionPage({
    section: this.section,
    sectionHtml,
    settings: settings,
    loggedUser: this.req.user,
    backInfo
   });
})

function* findSection(next) {
  let section = getSectionByUrl(this.params[0].replace("/admin", ""));
  if(!section) this.throw('Not found', 404);

  this.section = section;
  yield next;
}

export default sectionsRouter;