Global variables are declared in the code outside of any function definitions, in the top-level scope.
```
var a = 'Fred Flinstone'; // This is a global variable
function alpha() {
    console.log(a);
}
alpha(); // Outputs 'Fred Flinstone'
```

In this example, a is a global variable; it is therefore readily available in any function within our code. So here we can output the value of a from the method alpha. When we call alpha the value Fred Flinstone is written to the console.

When declaring global variables in a web browser they are also properties of the global window object. Take a look at this example:-
```
var b = 'Wilma Flintstone';
window.b = 'Betty Rubble';
console.log(b); // Outputs 'Betty Rubble'
```
b can be accessed/modified as the property of the window object window.b. Of course it isn’t necessary to assign the new value to b via the window object, this is just to prove a point. We are more likely to write the above as:-
```
var b = 'Wilma Flintstone';
b = 'Betty Rubble';
console.log(b); // Outputs 'Betty Rubble'
```
Be careful when using global variables. They can lead to unreadable code that is also difficult to test. I’ve seen many developers come unstuck with global variables trying to discover where the variable’s value is being changed within their codebase causing unexpected bugs. It is far better to pass variables as arguments to functions than rely on globals. Global variables should be used sparingly if at all.

If you really need to use the global scope it is a good idea to namespace your variables so that they become properties of a global object. For example, create a global object named something like globals or app.
```
var app = {}; // A global object
app.foo = 'Homer';
app.bar = 'Marge';
function beta() {
    console.log(app.bar);
}
beta(); // Outputs 'Marge'
```
If you are using NodeJS then the top-level scope is not the same as the global scope. If you use var foobar in a NodeJS module it is local to that module. To define a global variable in NodeJS we need to use the global namespace object, global.

global.foobar = 'Hello World!'; // This is a global variable in NodeJS
It’s important to be aware that if you do not declare a variable using one of the keywords var, let or const in your codebase then the variable is given a global scope.
```
function gamma() {
    c = 'Top Cat';
}
gamma();
console.log(c); // Outputs 'Top Cat'
console.log(window.c); // Outputs 'Top Cat'
```
It’s a good idea to always initially declare variables with one of the variable keywords. This way we are in control of each variables scope within our code. Hopefully you can see the potential dangers of forgetting to use a keyword like in the above example.