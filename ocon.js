// Filename: ocon.js
// Timestamp: 2015.12.19-17:31:15 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

var ocon = module.exports = (function (p) {

  p = function (args) {
    return p.putarr(function (obj) {
      return p.putarr(obj, args);
    }, (args = [].slice.call(arguments, 0)));
  };
  
  p.put = function (obj, composefn) {
    return composefn(obj), obj;
  };
  
  p.putarr = function (obj, composefnarr) {
    if (typeof obj !== 'function') {
      throw new Error('[!!!] ocon: invalid call, functions required');
    }

    return composefnarr.map(function (fn) {
      obj = p.put(obj, fn);
    }) && obj;
  };

  return p;

}());
