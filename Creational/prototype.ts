/**
 * The prototype pattern allows the creation of a new object instance 
 * from another one that is similar, and is then modified according to specific needs 
 */

 const prototypeObject = {
   doSomething() {
     return 'Doing something!';
   }
 }

 const clonedObject = Object.create(prototypeObject, { name: { value: 'Cloned Name! '}});
 console.log(clonedObject);
 console.log(clonedObject.doSomething()/*JS goes up the Prototype Chain until it finds the method*/);
 console.log(Object.getPrototypeOf(clonedObject));