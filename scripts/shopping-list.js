'use strict';
/* global store, cuid, $, api  */

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="shopping-item type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  

  function addErrorToStoreAndRender(error){
    console.log('CCC',error);
    store.error = error;
    shoppingList.render();
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = [ ...store.items ];
    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = items.filter(item => item.name.includes(store.searchTerm));
    }
    
    if(store.error){
      $('.error-message').html(store.error);
    }
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  
  
  //  function addItemToShoppingList(itemName) {
  //     store.items.push({ id: cuid(), name: itemName, checked: false });
  //   } 
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();

      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      api.createItem(newItemName)
        //.then(res => res.json())
        .then((newItem) => {
          store.addItem(newItem);
          render();
        })
        .catch(err => {
          console.log('test BBBB',err.message);
          addErrorToStoreAndRender(err.message);});
    });
  }

  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const foundItem = store.items.find(item => item.id === id);
      
      foundItem.checked =!foundItem.checked;
      const updateData = {
        checked:foundItem.checked
      };
      console.log('test updateData inside handleItemCheckClicked',updateData);
      api.updateItem(id, updateData)
        //.then(res => {return res.json();})
        .then((updatedItem) => {
          //console.log('test inside api.updateItem',updatedItem);
          store.findAndUpdate(id,updatedItem);
          render();
        })
        .catch(err => addErrorToStoreAndRender(err.message));
      
    });
  }
  
 
  
  function toggleCheckedItemsFilter() {
    store.hideCheckedItems = !store.hideCheckedItems;
  }
  
  function setSearchTerm(val) {
    store.searchTerm = val;
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      
      api.deleteItem(id)
        .then(() => store.deleteItem(id));
        
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      
      const updateData = {
        name: itemName
      };
      api.updateItem(id, updateData)

        //.then(res=> res.json())
        .then(() => {
          
          store.findAndUpdate(id,updateData); 
        });
      
      
      //editListItemName(id, itemName);
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      toggleCheckedItemsFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      setSearchTerm(val);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
    addErrorToStoreAndRender();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
