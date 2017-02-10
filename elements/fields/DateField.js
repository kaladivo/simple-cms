import TextField from './TextField';
import settings from '../../settings';
import pug from 'pug';
import moment from 'moment';

export default class DateField extends TextField {

  constructor(name, data) {
    super(name, data);
    this.type = "date";
    this.class = this.class + " datetime-picker"; 
  }

  * getValueToStore(valueFromPost) {
    return new Date(valueFromPost);
  }

  * renderHtml(request, value){ 
    if(!value) return yield super.renderHtml(request, value);
    return yield super.renderHtml(request, moment(value).format("YYYY-MM-DD"));
  }
}