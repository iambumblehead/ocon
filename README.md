ocon
====
**(c)[Bumblehead][0]** [MIT-license](#license)


Define objects reusable to compose new objects.

For example, 'view' objects. One object with functions to render markup. Another with functions to manipulate a dropdown. Combine both objects to create a dropdown view. Reuse the dropdown with something else to create a thumbnail icon dropdown. Reuse generic parts of the dropdown to compose navigation systems and video galleries.

`ocon` allows you to avoid using 'this' (say you're trying to use a more functional style). The definition space used to compose each object has a reference to its unique namespace _not_ defined by 'this'. `ocon` does not compose objects through deep inheritance chains which tend to be [slower][1] on property lookup and harder to debug (an opinion).


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://jsperf.com/long-prototype-chains/3       "prototype chain"


```javascript
const ocon = require('ocon');
const viewobj = ocon(o => {
  o.getname = () => 'viewobj';
  o.gettype = () => 'type-' + o.getname();
});
const viewdropdown = ocon([viewobj], o => {
  o.getname = () => 'dropdown';
});
console.log(viewdropdown.gettype()); // type-dropdown
```


 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
