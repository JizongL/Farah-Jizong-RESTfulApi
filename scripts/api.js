'use strict';
/* global $ */

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/fgdl';

  const getItems = function(){
    //return Promise.resolve('A successful response!');
    return fetch(BASE_URL+'/items');
  };

  const createItem = function(name){
    const newItem = JSON.stringify({
      name: name,
    });

    const option = {
      method: 'POST', 
      headers: new Headers ({
        'Content-type': 'application/json'
      }),
      body: newItem
    };

    return fetch(BASE_URL+'/items', option);
  };

  return {
    getItems: getItems,
    createItem: createItem,
  };

}());
