import ParentSection from './ParentSection';
import pug from 'pug';
import settings from '../../settings';

export default class AddableList extends ParentSection{
  constructor(data) {
    super(data);
    this.onOnePage = data.onOnePage || 10;
    this.previewFields = data.previewFields;
    this.sortQuery = data.sortQuery;
    this.dbDocument = data.dbDocument;
    this.model = data.model;
    this.model.setParent(this);
  }
  
  * renderHtml(request, response){
    const {id, action} = request.query;
    let messages = [];

    if(action == "remove" && id) {
      yield this.dbDocument.remove(id);
      messages.push("removed");
    } else if(id) {
      let values = yield this.dbDocument.findOne(request.query.id);
      return yield this.model.renderHtml(request, {values});
    }

    if(action == "new"){
      return yield this.model.renderHtml(request, {values:{}});
    }
    
    let totalPages = Math.ceil((yield this.dbDocument.count()) / this.onOnePage);
    if(request.query.page > totalPages) return response.redirect(this.getUrl() + "/?page=" + totalPages);
    if(request.query.page < 1) return response.redirect(this.getUrl() + "/?page=1");

    return pug.renderFile(settings().viewsDir + '/elements/sections/AddableList.pug', {
      section: this,
      settings: settings(),
      previewFields: this.previewFields, 
      items: yield this._getItemsToRender(request.query.page - 1),
      totalPages,
      page: request.query.page || 1,
      messages
    });
  }

  * savePost(request, response) {
    let savedPost = yield this.model.savePost(request);
    if(!savedPost._id) {
      return savedPost;
    }
    if(!request.query.id) response.redirect(this.getUrl() + "/?id=" + savedPost._id);
  }

  * _getItemsToRender(pageIndex) {
    // let previewFields = this.previewFields;
    let items = yield this.dbDocument.find({}, 
      {limit: this.onOnePage, sort: this.sortQuery, skip: pageIndex * this.onOnePage}
    );
    // let previewItems = items.map(item => {
    //   let result = [];
    //   for (let previewField of previewFields) {
    //     result.push(item[previewField]);
    //   }
    //   return result;
    // })

    return items;
  }
}