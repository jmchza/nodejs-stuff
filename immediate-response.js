'use strict'

function testEventEmitters() {          
console.log('\nStarting Event Emitter Test')
const events = require('events')
let emitter = new events.EventEmitter();


function sleep(millis) {
          return new Promise(function (resolve, reject) {
              setTimeout(function () { resolve(); }, millis);
          });
      }

async function main() {
          console.log("Foo");
          await sleep(2000);
          console.log("Bar");
}

var interval = 10 * 1000;

emitter.on('myEvent', data => {
                    console.log('[immediate]', data)
          })

          emitter.emit('myEvent', 'The Event Emitter Has Something to say');

          
          const array = [1,2,3,4,5] ;
          for (let index = 0; index < 10; index++) {
                    setTimeout( () => {
                              emitter.on('myEvent', data => {
                                        console.log('[later___]', data)
                              })
                    
                              console.log('Event Emitter Done')
                    }, interval * index, index);
          }
          
}



// function testPromises(){
//           console.log('\nStarting Promise Test')
//           let promise = new Promise( (resolve, reject) => {
//                     resolve('The Promise Has something to say')
//           })
//           promise.then(data => {
//                     console.log('[immediate]', data)
//           })

//           setTimeout( () => {
//                     promise.then(data => {
//                               console.log('[later]', data)
//                     })
//                     console.log('Promise Done')
//           }, 1000)
// }

setTimeout(testEventEmitters,0)
// setTimeout(testPromises,1000)