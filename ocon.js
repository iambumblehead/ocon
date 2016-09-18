// Filename: ocon.js
// Timestamp: 2016.09.18-15:22:09 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

const ocon = module.exports = (p => {
  
  p = (arr, fn) => {
    fn  = typeof arr === 'function' ? arr : fn;
    arr = Array.isArray(arr) ? arr : [];
    arr.push(fn);

    return p.compose(arr);
  };
  
  p.compose = args => 
    p.putarr(obj => p.putarr(obj, args), args);  
  
  p.put = (obj, composefn) =>
    (composefn(obj), obj);

  p.putarr = (obj, composefnarr) => {
    if (typeof obj !== 'function') {
      throw new Error('[!!!] ocon: invalid call, functions required');
    }

    return composefnarr.map(fn => obj = p.put(obj, fn)) && obj;
  };

  return p;

})();
