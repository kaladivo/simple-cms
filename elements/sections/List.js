import ParentSection from './ParentSection';
import settings from '../../settings';
import pug from 'pug';

export default class List extends ParentSection {
  constructor(data) {
    super(data);
  }

  * renderHtml(request){
    return pug.renderFile(settings().viewsDir + '/elements/sections/list.pug', {
      section: this,
      settings: settings()
    });
  }
}