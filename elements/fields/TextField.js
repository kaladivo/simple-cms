import Field from './Field';
import settings from '../../settings';
import pug from 'pug';

export default class TextField extends Field {

  constructor(name, data) {
    super(name, data);
    this.type = data.type || "text";
    this.placeholder = data.placeholder || "";
  }

  * getValueToStore(valueFromPost) {
    return valueFromPost;
  }

  * renderHtml(request, value){
    value = value || this.default;
    return pug.renderFile(settings().viewsDir + '/elements/fields/textField.pug', {
      field: this,
      value,
      settings: settings()
    });
  }
}