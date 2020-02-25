'use strict';

console.log('process.argv[0]', process.argv[0])
console.log('process.argv[1]', process.argv[1])

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

let getNumber = () => {
    return Promise.resolve(_i)
}

getNumber()
    .then(promiseInPromise)
    .then(console.log('promise in PROMISE:', _i, '^2 = ', process.argv[1] ))
    .catch(console.error());

getNumber()
    .then(valueAsPromise(4))
    .then(console.log('promise in valiue:', _i, '^2 = ' ))
    .catch(console.error());

    // console.log.bind(this, 'promise in valiue:', _i, '^2 = ')

//----- If you pass then() a non-function (such as a promise), it actually interprets it as then(null), 
//which causes the previous promise's result to fall through. 
Promise.resolve('foo').then(Promise.resolve('bar')).then(function (result) {
    console.log(result);
  });
 
  //equal to

Promise.resolve('foo').then(null).then(function (result) {
    console.log(result);
});