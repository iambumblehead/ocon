// Filename: ocon.js
// Timestamp: 2017.09.16-15:55:53 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)
//
// builds new object composed of methods from given objects
//
// references to returned object behave like 'this'
// 'methods' on base objects have property definitions
// specific to the final composed object
// 

module.exports = (arr, fn = typeof arr === 'function' ? arr : fn) => {
  const putarr = (obj, fnarr) => (
    fnarr.map(fn => fn(obj)) && obj);

  arr = Array.isArray(arr) ? arr : [];
  arr.push(fn);

  // returns a final 'function' value that composes
  // a new object w/ putarr
  //
  // a cache for multiple ocon compositions
  // and allows the object created here to be reused as
  // composition function foir another object
  //
  return putarr(obj => putarr(obj, arr), arr);
};


