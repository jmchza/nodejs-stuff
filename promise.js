'use strict';

let _i = process.argv[2] || 7

let promiseInPromise = x => {
    return new Promise((resolve, reject)=>{
        if(!x){
            return reject(new Error('NoinputDefined'))
        }

        resolve(x * x); 
    });
}

let valueAsPromise = x => {
    if(!x){
        return reject(new Error('NoinputDefined'))
    }

    return x * x; 
}

let getNumber = () =>{
    return Promise.resolve(_i)
}

getNumber()
    .then(promiseInPromise)
    .then(console.log('promise in PROMISE:', _i, '^2 = ', process.argv[1] ))
    .catch(console.error());

getNumber()
    .then(valueAsPromise)
    .then(console.log('promise in valiue:', _i, '^2 = ' ))
    .catch(console.error());

    // console.log.bind(this, 'promise in valiue:', _i, '^2 = ')