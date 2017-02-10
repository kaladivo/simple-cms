import Model from './Model';
import pug from 'pug';
import settings from '../../settings';

export default class SpecificPageModel extends Model {
  constructor(data) {
    super(data);
    this.pageIdentification = data.pageIdentification;
    this.dbDocument = data.dbDocument;
  }

  * renderHtml(request, data = {}){
    data.values = data.values || (yield this.fetchFromDb());
    return yield super.renderHtml(request, data);
  }

  * saveToDb(data) {
    let result = yield this.dbDocument.findOneAndUpdate(this.pageIdentification,{...data, ...this.pageIdentification});
    if(result.value === null) return yield this.dbDocument.insert({...data, ...this.pageIdentification});
    return result;
  }
  * fetchFromDb () {
    let res = (yield this.dbDocument.findOne(this.pageIdentification)) || {};
    return res;
  }
}