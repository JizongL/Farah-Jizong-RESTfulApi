'use strict';
/* global $ */

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/fgdl';

  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
  
        // In either case, parse the JSON stream:
        return res.json();
      })
  
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }


  const getItems = function(){
    //return Promise.resolve('A successful response!');
    return fetch(BASE_URL+'/items');
    //listApiFetch(BASE_URL+'/items');
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
   // listApiFetch(BASE_URL+'/items',option);
  };

  const updateItem = function(id, updateData){
    const option = {
      method: 'PATCH', 
      headers: new Headers ({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify(updateData)
    };
    return fetch(BASE_URL+`/items/${id}`, option);
    //listApiFetch(BASE_URL+`/items/${id}`, option);
  };

  const deleteItem = function(id){
    const option = {
      method: 'DELETE', 
      headers: new Headers ({
        'Content-type': 'application/json'
      }),
    };
    return fetch(BASE_URL+`/items/${id}`, option);
  };

  return {
    getItems: getItems,
    createItem: createItem,
    updateItem:updateItem,
    deleteItem: deleteItem
  };

}());
