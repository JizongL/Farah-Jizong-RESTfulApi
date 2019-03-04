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

api.getItems()
  .then(res => console.log(res));
console.log(api.BASE_URL);

$(document).ready(function() {
  shoppingList.bindEventListeners();
  shoppingList.render();
});
