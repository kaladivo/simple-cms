import Section from './Section';

export default class ParentElement extends Section{
  constructor(data) {
    super(data);
    this.childrens = data.childrens;
  }

  _assignParentToChildren() {
    Object.keys(this.childrens).forEach((key, children) => children.setParent(this));
  }
}