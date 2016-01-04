export class UpdateMenuSearchAction {
    constructor(queryText) {
        this.queryText = queryText;
    }
}

// This will eventually include all those options and stuffs
export class AddItemToOrderAction {
  constructor({order, orderItemData}) {
    this.order = order;
    this.orderItemData = orderItemData;
  }
}
