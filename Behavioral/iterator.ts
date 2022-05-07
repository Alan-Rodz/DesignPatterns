/**
 * The iterator pattern allows the traversal of a collection of objects
 */

const items = ['item1', 'item2', 'item3'];
for(const item of items) {
  console.log(item);
}

const range = (start: number, end: number, step = 1) => {
  return {
    [Symbol.iterator]() {
      return this/*allows the usage of range in 'for of' loop*/;
    },

    next() {
      if(start < end) {
        start = start + step;
        return { value: start, done: false }
      } 
      /* else start > end */

      return { done: true, value: end }
    }
  }
}

for(const n of range(0, 20, 5)) {
  console.log(n);
}