import Element from '../Element';

import settings from '../../settings';

export default class Section extends Element {
  constructor(data) {
    super();
    this.title = data.title;
    this.description = data.description;
    this.urlName = data.urlName || data.title.toLowerCase();
  }

  getUrl(){
    if(this.parent) {
      return this.parent.getUrl() + '/' + this.urlName;
    } else {
      return settings().adminUrl + '/' + this.urlName;
    }
  }

  * post (request) {
    return false;
  }

  setParent(parent) {
    this.parent = parent;
  }
}