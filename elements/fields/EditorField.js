import Field from './Field';
import settings from '../../settings';
import pug from 'pug';

export default class EditorField extends Field {

  constructor(name, data) {
    super(name, data);
  }

  * renderHtml(request, value){
    value = value || this.default;
    return pug.renderFile(settings().viewsDir + '/elements/fields/editorField.pug', {
      field: this,
      value,
      settings: settings()
    });
  }
}