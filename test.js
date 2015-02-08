var should = require('should');
var merge = require('./index.js');

var male = "m";
var female = "f";

var source = {
  "a": { "name": "Adam", "gender": male, "phone": "+10000000000", "colors": [ "red", "pink" ],  "location": { "system": "Milky Way", "planet": "Earth" } },
  "b": { "name": "Ben", "gender": male, "phone": "+10000000000", "colors": [ "red" ], "location": { "system": "Milky Way", "planet": "Earth" } },
  "c": { "name": "Claire", "gender": female, "phone": "+10000000000", "colors": [ "black", "white" ], "location": { "system": "Milky Way", "planet": "Earth" } },
  "d": { "name": "Drew", "gender": male, "phone": "+10000000000", "colors": [ "blue", "gold" ], "location": { "system": "Milky Way", "planet": "Earth" } }
};

var branch = merge(source);


source.a.phone = "+12222222222";
source.b.phone = "+12222222222";
source.c.phone = "+12222222222";
source.d.phone = "+12222222222";

branch.a.phone = "+11111111111";
branch.a.location.planet = "MARS";

branch.b = { "name": "Benjamin", "gender": male, "phone": "+11111111111" };

delete branch.c.colors;

merge(branch, source);

source.a.should.have.property('phone', '+11111111111');
source.a.location.should.have.property('system', 'Milky Way');
source.a.location.should.have.property('planet', 'MARS');

source.b.should.have.property('phone', '+11111111111');
source.b.should.not.have.property('colors');
source.b.should.not.have.property('location');

source.c.should.have.property('phone', '+12222222222');
source.c.should.not.have.property('colors');

source.d.should.have.property('phone', '+12222222222');

var pets = [
  { name: 'Spot', age: 3 },
  { name: 'Remy', age: 6 }
];

var pets_branch = JSON.parse(JSON.stringify(pets));
merge(pets_branch, true);

pets[0].name = 'Ace';

pets_branch[0].age = 4;

merge(pets_branch, pets);

pets[0].should.have.property('name', 'Ace');
pets[0].should.have.property('age', 4);