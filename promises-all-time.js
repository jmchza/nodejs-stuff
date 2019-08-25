 'use strict';

 const uuid = require('uuid');
 const db = {query: (sql, params, callback) => {let result = [{numMatches: 0}];  } }

 function generateIdSync(){
           return uuid.v4();
 }

 try {
          let widgetId = generateIdSync();
          console.log(`Create Widget: ${widgetId} (sync)`);
          
 } catch (error) {
           console.error(error);
 }

 function generateIdCallback(calllback){
          try {
                    calllback(undefined, uuid.v4()) 
          } catch (error) {
                    calllback(error)
          }
 }

 generateIdCallback(function (err, widgetId){
          if(err){
                    return console.error(err)
          }
          console.log(`Create Widget: ${widgetId} (callback)`);
 });

 //as a Promise

 function generateIdPromise(){
           return Promise.resolve(uuid.v4())
 }

 generateIdPromise()
          .then(widgetId => {console.log(`Create Widget: ${widgetId} (prmoise)`);})
          .catch(console.error)