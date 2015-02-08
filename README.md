merge-to-source
===============
Merge an object's changes back to its source.

Usage
-----
Basic usage:

``` var merge = require('merge-to-source');
var pets = { name: 'Spot', age: 3 };
var branch = merge(source);
pets.location = 'Earth';
branch.age = 4;
merge(branch, pets);
//source: { name: 'Spot', age: 4, location: 'Earth' } ```

Clone an object and store its initial state:

``` var source = { name: 'Spot', age: 3 };
var branch = merge(source);
//make some changes
merge(branch, source); ```

Bring your own object:

``` var source = { name: 'Spot', age: 3 };
var branch = { name: 'Spot', age: 3 };
merge(branch, true);
//make some changes
merge(branch, source); ```

Install
-------
``` npm install merge-to-source --save ```