import ParentSection from './ParentSection';
import pug from 'pug';
import settings from '../../settings';

export default class Model extends ParentSection {
  constructor(data) {
    super(data);
    this.fields = data.fields;
    this.pugFile = '/elements/sections/model.pug';
  }

  * validate(request) {
    let errors = [];

    for(let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      let error = yield field.validate(request.body[field.name]);
      if(error) errors.push(error);
    }

    if(errors.length > 0) return errors;
    return false;
  }

  * savePost(request) {
    let errors = yield this.validate(request);
    if(errors) return yield this.renderHtml(request, {errors, values: request.body});

    let res = yield this.saveToDb(yield this._getDataToSave(request.body), request);
    return res;
  }

  * renderHtml(request, data = {}){
    let values = data.values
    let fieldsHtml = [];

    for(let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      fieldsHtml.push(yield field.renderHtml(request, values[field.name]));
    }

    return pug.renderFile(settings().viewsDir + this.pugFile, {
      section: this,
      fieldsHtml,
      settings: settings(),
      request,
      ... data
    });
  }

  * _getDataToSave(postData) {
    let valuesToStore = {};
    for(let key in postData) {
      let field = this.fields.find(field => field.name == key);
      if(!field) continue;

      valuesToStore[key] = yield field.getValueToStore(postData[key]);
    }
    return valuesToStore;
  }
}