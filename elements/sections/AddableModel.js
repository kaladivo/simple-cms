import Model from './Model';
import pug from 'pug';
import settings from '../../settings';

export default class AddableModel extends Model {
  constructor(data) {
    super(data);
    this.pugFile = '/elements/sections/addableModel.pug';
  }

  * saveToDb(values, request) {
    let res;
    if(request.query.id){
      res = yield this.parent.dbDocument.update(request.query.id, values);
    } else {
      res = yield this.parent.dbDocument.insert(values);
    }
    return res;
  }

  * renderHtml(request, data = {}){
    return yield super.renderHtml(request, data);
  }
}