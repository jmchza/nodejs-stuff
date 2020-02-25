const fetch = require("node-fetch");

// some dummy urls to resolve
const urls = ['http://google.com/1', 'http://google.com/2', 'http://google.com/3']

// convert each url to a function that returns an ajax call
const fx = urls.map(url => () => {
          console.log(url);
           return fetch(url).then( x=> x).then( res => res ).catch(e => e.message)
});

Promise.resolve()
.then( x => fx[0]() )
.then( x => fx[1]() )
.then( x => fx[2]() )
.catch(e => console.log(e) )

//Using async function if the environment supports it:
 async function readFiles(files) {
    for(const file of files) {
      await readFile(file);
    }
  };

//If you'd like, you can defer reading the files until you need them using an async generator (if your environment supports it):
  async function* readFiles(files) {
    for(const file of files) {
      yield await readFile(file);
    }
  };