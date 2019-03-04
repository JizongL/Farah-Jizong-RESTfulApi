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
  searchTerm: ''
};

api.createItem('pears')
  .then(res => res.json())
  .then((newItem) => {
    return api.getItems();
  })
  .then(res => res.json())
  .then(((items) => {
    console.log(items);
  }));


$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
});
