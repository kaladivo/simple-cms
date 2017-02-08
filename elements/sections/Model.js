import Section from './Section';
import pug from 'pug';
import settings from '../../settings';

export default class Model extends Section {
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

    return yield this.saveToDb(request.body, request);
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
}