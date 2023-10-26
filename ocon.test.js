import test from 'node:test'
import assert from 'node:assert/strict'
import ocon from './ocon.js'

test('should build an object', () => {
  var viewobj = ocon(o => {
    o.myname = () => 'viewobj';
  });

  assert.strictEqual( viewobj.myname(), 'viewobj' );
});

test('should build an object from another object', () => {
  var viewobja = ocon(o => {
    o.myinheritedname = () => 'inheritednamea';
    o.myname = () => 'viewobja';
  });

  var viewobjb = ocon([
    viewobja
  ], o => {
    o.myname = () => 'viewobjb';
  });

  assert.strictEqual( viewobjb.myname(), 'viewobjb' );
  assert.strictEqual( viewobjb.myinheritedname(), 'inheritednamea' );    
});

test('should build many objects from an object', () => {
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

  assert.strictEqual( viewobjb.myname(), 'viewobjb' );
  assert.strictEqual( viewobjb.nameprop, 'bname' );    
  assert.strictEqual( viewobjb.myinheritedname(), 'inheritednamea' );

  assert.strictEqual( viewobjc.myname(), 'viewobjc' );
  assert.strictEqual( viewobjc.nameprop, undefined );    
  assert.strictEqual( viewobjc.myinheritedname(), 'inheritednamea' );        
});

test('should build an objects from many objects', () => {
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

  assert.strictEqual( viewobjd.myname(), 'viewobjd' );
  assert.strictEqual( viewobjd.nameprop, 'bname' );
  assert.strictEqual( viewobjd.myinheritedname(), 'inheritednamea' );
  assert.strictEqual( viewobjd.myinheritednamebig(), 'inheritednameaBIG' );    
});


test('should build objects so ... get-started in readme example is correct', () => {
  var viewobj = ocon(o => {
    o.getname = () => 'viewobj';
    o.gettype = () => 'type-' + o.getname();
  });
  
  var viewdropdown = ocon([viewobj], o => {
    o.getname = () => 'dropdown';
  });

  assert.strictEqual( viewobj.gettype(), 'type-viewobj' );
  assert.strictEqual( viewdropdown.gettype(), 'type-dropdown' );    
});
