// Filename: ocon.js
// Timestamp: 2015.04.27-15:08:48 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var ocon = ((typeof module === 'object') ? module : {}).exports = (function (p, o) {

  o = {
    put : function (obj, composefn) {
      composefn(obj);
      return obj;
    },
    putarr : function (obj, composefnarr) {
      return composefnarr.map(function (fn) {
        obj = o.put(obj, fn);
      }) && obj;
    }
  };

  p = function (args) {
    return o.putarr(function (obj) {
      return o.putarr(obj, args);
    }, (args = [].slice.call(arguments, 0)));
  };

  return p.proto = o && p;

}());
