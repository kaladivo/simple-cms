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
  this.body = compileSectionPage({
    section: this.section,
    sectionHtml: yield this.section.renderHtml(this.request, this.response)
   });
});

sectionsRouter.post(/(.*)/, function*(next) {
  let savedDocument = yield this.section.savePost(this.request, this.response);
  this.body = compileSectionPage({
    section: this.section,
    sectionHtml: yield this.section.renderHtml(this.request, {values: savedDocument})
   });
})

function* findSection(next) {
  let section = getSectionByUrl(this.params[0].replace("/admin", ""));
  if(!section) this.throw('Not found', 404);

  this.section = section;
  yield next;
}

export default sectionsRouter;