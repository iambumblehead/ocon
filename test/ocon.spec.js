// Filename: ocon.spec.js  
// Timestamp: 2015.04.27-15:27:19 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var ocon = require('../ocon');

describe('ocon', function () {
  it('should build an object', function () {
    var viewobj = ocon(function (o) {
      o.myname = function () {
        return 'viewobj';
      };
    });

    expect( viewobj.myname() ).toBe( 'viewobj' );
  });

  it('should build an object from another object', function () {
    var viewobja = ocon(function (o) {
      o.myinheritedname = function () {
        return 'inheritednamea';
      };
      
      o.myname = function () {
        return 'viewobja';
      };
    });

    var viewobjb = ocon(viewobja, function (o) {
      o.myname = function () {
        return 'viewobjb';
      };
    });

    expect( viewobjb.myname() ).toBe( 'viewobjb' );
    expect( viewobjb.myinheritedname() ).toBe( 'inheritednamea' );    
  });

  it('should build many objects from an object', function () {
    var viewobja = ocon(function (o) {
      o.myinheritedname = function () {
        return 'inheritednamea';
      };
      
      o.myname = function () {
        return 'viewobja';
      };
    });

    var viewobjb = ocon(viewobja, function (o) {
      o.nameprop = 'bname';
      o.myname = function () {
        return 'viewobjb';
      };
    });

    var viewobjc = ocon(viewobja, function (o) {
      o.myname = function () {
        return 'viewobjc';
      };
    });    

    expect( viewobjb.myname() ).toBe( 'viewobjb' );
    expect( viewobjb.nameprop ).toBe( 'bname' );    
    expect( viewobjb.myinheritedname() ).toBe( 'inheritednamea' );

    expect( viewobjc.myname() ).toBe( 'viewobjc' );
    expect( viewobjc.nameprop ).toBe( undefined );    
    expect( viewobjc.myinheritedname() ).toBe( 'inheritednamea' );        
  });
  
  it('should build an objects from many objects', function () {
    var viewobja = ocon(function (o) {
      o.myinheritedname = function () {
        return 'inheritednamea';
      };
      
      o.myname = function () {
        return 'viewobja';
      };
    });

    var viewobjb = ocon(viewobja, function (o) {
      o.nameprop = 'bname';
      o.myname = function () {
        return 'viewobjb';
      };
    });

    var viewobjc = ocon(viewobja, function (o) {
      o.myname = function () {
        return 'viewobjc';
      };
    });

    var viewobjd = ocon(viewobja, viewobjb, viewobjc, function (o) {
      o.myname = function () {
        return 'viewobjd';
      };

      o.myinheritednamebig = function () {
        return o.myinheritedname() + 'BIG';
      };
    });

    expect( viewobjd.myname() ).toBe( 'viewobjd' );
    expect( viewobjd.nameprop ).toBe( 'bname' );
    expect( viewobjd.myinheritedname() ).toBe( 'inheritednamea' );
    expect( viewobjd.myinheritednamebig() ).toBe( 'inheritednameaBIG' );    
  });

  it('should build objects so ... get-started in readme example is correct', function () {
    var viewobj = ocon(function (o) {
      o.getname = function () {
        return 'viewobj';
      };
      o.gettype = function () {
        return 'type-' + o.getname();
      };
    });
    var viewdropdown = ocon(viewobj, function (o) {
      o.getname = function () {
        return 'dropdown';
      };
    });

    expect( viewdropdown.gettype() ).toBe( 'type-dropdown' );    
  });
});

