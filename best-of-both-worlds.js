'user strict'

let doProcessingSteps = inputData =>{
          return Promise.resolve(inputData.toLowerCase())
}

module.exports.processData = (inputData, callback) => {
          if(typeof callback === 'function'){
                    doProcessingSteps(inputData)
                    .then(result => {callback(undefined, result) })
                    .catch(callback)
                    return undefined
          }
          return doProcessingSteps(inputData)
}

const awesomeCallbackLibrary = module.exports
awesomeCallbackLibrary.processData('Hello World!', (err, output) =>{
          if(err){
                    return console.error(err)
          }
          console.log('callback result:', output)
})

const awesomePromiseLibrary = module.exports
awesomePromiseLibrary.processData('Hellow World !')
.then(console.log.bind(this, 'promise result: '))
.catch(console.error)