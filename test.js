

function curry(fn) {

  function carried(...args) {
    if (fn.length <= args.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return carried.apply(this, args.concat(args2));
      }
    }
  }

  return carried;
}

const cr = curry((a, b, c) => a + b + c)
console.log(cr(1)(2)(22))