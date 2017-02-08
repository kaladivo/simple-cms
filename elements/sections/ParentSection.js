import Section from './Section';

export default class ParentSection extends Section{
  constructor(data) {
    super(data);
    this.children = data.children;
    this._assignParentToChildren();
  }

  _assignParentToChildren() {
    if(this.children) this.children.forEach(child => child.setParent(this));
  }
}