// Filename: ocon.spec.js  
// Timestamp: 2017.09.16-15:55:03 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)  

const ocon = require('../');

describe('ocon', () => {

  it('should build an object', () => {
    var viewobj = ocon(o => {
      o.myname = () => 'viewobj';
    });

    expect( viewobj.myname() ).toBe( 'viewobj' );
  });

  it('should build an object from another object', () => {
    var viewobja = ocon(o => {
      o.myinheritedname = () => 'inheritednamea';
      o.myname = () => 'viewobja';
    });

    var viewobjb = ocon([
      viewobja
    ], o => {
      o.myname = () => 'viewobjb';
    });

    expect( viewobjb.myname() ).toBe( 'viewobjb' );
    expect( viewobjb.myinheritedname() ).toBe( 'inheritednamea' );    
  });

  it('should build many objects from an object', () => {
    var viewobja = ocon(o => {
      o.myinheritedname = () => 'inheritednamea';
      
      o.myname = () => 'viewobja';
    });

    var viewobjb = ocon([
      viewobja
    ], o => {
      o.nameprop = 'bname';
      o.myname = () => 'viewobjb';
    });

    var viewobjc = ocon([
      viewobja
    ], o => {
      o.myname = () => 'viewobjc';
    });    

    expect( viewobjb.myname() ).toBe( 'viewobjb' );
    expect( viewobjb.nameprop ).toBe( 'bname' );    
    expect( viewobjb.myinheritedname() ).toBe( 'inheritednamea' );

    expect( viewobjc.myname() ).toBe( 'viewobjc' );
    expect( viewobjc.nameprop ).toBe( undefined );    
    expect( viewobjc.myinheritedname() ).toBe( 'inheritednamea' );        
  });

  it('should build an objects from many objects', () => {
    var viewobja = ocon(o => {
      o.myinheritedname = () => 'inheritednamea';
      o.myname = () => 'viewobja';
    });

    var viewobjb = ocon([viewobja], o => {
      o.nameprop = 'bname';
      o.myname = () => 'viewobjb';
    });

    var viewobjc = ocon([viewobja], o => {
      o.myname = () => 'viewobjc';
    });

    var viewobjd = ocon([viewobja, viewobjb, viewobjc], o => {
      o.myname = () => 'viewobjd';
      o.myinheritednamebig = () => o.myinheritedname() + 'BIG';
    });

    expect( viewobjd.myname() ).toBe( 'viewobjd' );
    expect( viewobjd.nameprop ).toBe( 'bname' );
    expect( viewobjd.myinheritedname() ).toBe( 'inheritednamea' );
    expect( viewobjd.myinheritednamebig() ).toBe( 'inheritednameaBIG' );    
  });


  it('should build objects so ... get-started in readme example is correct', () => {
    var viewobj = ocon(o => {
      o.getname = () => 'viewobj';
      o.gettype = () => 'type-' + o.getname();
    });
    
    var viewdropdown = ocon([viewobj], o => {
      o.getname = () => 'dropdown';
    });

    expect( viewobj.gettype() ).toBe( 'type-viewobj' );
    expect( viewdropdown.gettype() ).toBe( 'type-dropdown' );    
  });
  
});

