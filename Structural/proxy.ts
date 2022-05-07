/**
 * This design pattern provides a surrogate, or placeholder,
 * for another object to control access to it. A target object
 * can be replaced with a proxy
 */

const originalObject = { name: 'Alan' }

const reactiveObject = new Proxy(originalObject, {
  get(target, key) {
    console.log('Tracking: ', key);
    return target[key];
  },

  set(target, key, value) {
    console.log('Updating...');
    return Reflect.set(target, key, value);
  }
});

reactiveObject.name;
reactiveObject.name = 'Someone Else'; 