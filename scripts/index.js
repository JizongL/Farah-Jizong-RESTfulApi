'use strict';
/* global shoppingList, cuid, $, api */

// eslint-disable-next-line no-unused-vars
const store = {
  items: [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ],
  hideCheckedItems: false,
  searchTerm: '',
  addItem:function(item){
    this.items.push(item);
  },
  findAndUpdate: function(id, updateData){
    const foundItem = this.items.find(item => item.id === id);
    Object.assign(foundItem, updateData);
  }
};


$(document).ready(function() {
  shoppingList.bindEventListeners();
  api.getItems()
    .then(res => { res.json();} )
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      shoppingList.render();
    });
  shoppingList.render();
});
