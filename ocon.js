// Filename: ocon.js
// Timestamp: 2015.04.28-00:33:29 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var ocon = ((typeof module === 'object') ? module : {}).exports = (function (p) {

  p = function (args) {
    return p.putarr(function (obj) {
      return p.putarr(obj, args);
    }, (args = [].slice.call(arguments, 0)));
  };
  
  p.put = function (obj, composefn) {
    composefn(obj);
    return obj;
  };
  
  p.putarr = function (obj, composefnarr) {
    return composefnarr.map(function (fn) {
      obj = p.put(obj, fn);
    }) && obj;
  };

  return p;

}());
