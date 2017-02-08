import Model from './Model';
import pug from 'pug';
import settings from '../../settings';

export default class SpecificPageModel extends Model {
  constructor(data) {
    super(data);
    this.fetchFromDb = data.fetchFromDb.bind(this);
    this.saveToDb = data.saveToDb.bind(this);
  }

  * renderHtml(request, data = {}){
    data.values = data.values || (yield this.fetchFromDb());
    return yield super.renderHtml(request, data);
  }
}