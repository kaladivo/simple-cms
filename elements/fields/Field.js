import Element from '../Element';

export default class Field extends Element {

  constructor(name, data) {
    super();
    this.name = name;
    this.label = data.label;
    this.default = data.default;
    this.class = "field " + data.class || "";
    this.id = data.id || name;
    this.validate = data.validate || function*(){}.bind(this);
  }

  * renderHtml(request){}

  * getValueToStore(valueFromPost) {
    return valueFromPost;
  }
}