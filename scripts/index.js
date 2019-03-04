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
    console.log('test foundItem and updateData',updateData, id);
    console.log('test store.items after object.assign',store.items);
    shoppingList.render();
  },
  deleteItem: function(id){
    const deleteItemIndex = this.items.findIndex(item => item.id === id);
    console.log('testing index' + deleteItemIndex + ' ' + id + ' ');
    console.log('testing store object' + store.items[deleteItemIndex].id);
    store.items.splice(deleteItemIndex, 1);
    shoppingList.render();
  }
};


$(document).ready(function() {
  shoppingList.bindEventListeners();
  api.getItems()
    .then(res =>  res.json())
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      shoppingList.render();
    });
  shoppingList.render();
});
