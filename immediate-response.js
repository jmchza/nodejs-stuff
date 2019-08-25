'use strict'

function testEventEmitters() {          
console.log('\nStarting Event Emitter Test')
const events = require('events')
let emitter = new events.EventEmitter();

emitter.on('myEvent', data => {
                    console.log('[immediate]', data)
          })

          emitter.emit('myEvent', 'The Event Emitter Has Something to say');
          setTimeout( () => {
                    emitter.on('myEvent', data => {
                              console.log('[later___]', data)
                    })
          
                    console.log('Event Emitter Done')
          }, 1000);
}



function testPromises(){
          console.log('\nStarting Promise Test')
          let promise = new Promise( (resolve, reject) => {
                    resolve('The Promise Has something to say')
          })
          promise.then(data => {
                    console.log('[immediate]', data)
          })

          setTimeout( () => {
                    promise.then(data => {
                              console.log('[later]', data)
                    })
                    console.log('Promise Done')
          }, 1000)
}

setTimeout(testEventEmitters,0)
setTimeout(testPromises,1000)