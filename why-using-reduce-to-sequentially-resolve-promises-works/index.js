let result = [1,2,5].reduce((accumulator, item) => {
return accumulator + item;
}, 0); // <-- Our initial value.

console.log('standard reduce', result); // 8
//----------------------------------------------------

function methodThatReturnsAPromise(nextID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      console.log(`methodThatReturnsAPromise ${nextID} minute ${new Date().getUTCSeconds()}`);
      
      resolve();
    }, 1000);
  });
}
//----------------------------------------------------
[4,5,6].reduce( (previousPromise, nextID) => {
  return previousPromise.then(() => {
    return methodThatReturnsAPromise(nextID);
  });
}, Promise.resolve());

//Or, in a more modern format:
[7,8,9].reduce( async (previousPromise, nextID) => {
  await previousPromise;
  return methodThatReturnsAPromise(nextID);
}, Promise.resolve());

/**
 * Why does this even work?
 * Remember, the main purpose of reduce() is to "reduce" a bunch of things into one thing, and it does that by storing up the result in the accumulator as the loop runs. 
 * But that accumulator doesn't have to be numeric. The loop can return whatever it wants (like a promise), and recycle that value through the callback every iteration. 
 * Notably, no matter what the accumulator value is, the loop itself never changes its behavior — including its pace of execution. It just keeps rolling through the collection as fast as the thread allows.
 * This is huge to understand because it probably goes against what you think is happening during this loop (at least, it did for me). 
 * When we use it to sequentially resolve promises, the reduce() loop isn't actually slowing down at all. It’s completely synchronous, doing its normal thing as fast as it can, just like always.
 * Look at the above snippet and notice how the progress of the loop isn't hindered at all by the promises returned in the callback.
 * the real magic occurs in this piece right here:
    return previousPromise.then(() => {
      return methodThatReturnsAPromise(nextID)
    });
  Each time our callback fires, we return a promise that resolves to another promise. 
  And while reduce() doesn't wait for any resolution to take place, the advantage it does provide is the ability 
  to pass something back into the same callback after each run, a feature unique to reduce(). 
  As a result, we're able build a chain of promises that resolve into more promises, 
  making everything nice and sequential:
 */
