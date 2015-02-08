module.exports = function(branch, source, intermediate){
  var jsondiffpatch = require('jsondiffpatch');
  var diffpatcher = jsondiffpatch.create();
  
  var isObject = function(x){
    if(typeof x === 'object') {
      return true;
    } else {
      return false
    }
  };
  
  var isUndefined = function(x){
    if(typeof x === 'undefined') {
      return true;
    } else {
      return false
    }
  };
  
  var clone = function(obj){
    var r = {};
    for(var key in obj){
      r[key] = obj[key];
    }
    return r;
  };
  
  var cloneAvoidMergeIntermediary = function(obj){
    var r = {};
    for(var key in obj){
      if(key !== '_merge_intermediary') {
        r[key] = obj[key];
      }
    }
    return r;
  };

  var makeMergable = function(b){
    b._merge_intermediary = JSON.parse(JSON.stringify(b));
  };
  
  var merge = function(theBranch, theSource, anIntermediary, intermediaryEmbedded){
    var holdIntermediary;
    if( intermediaryEmbedded === true ){
      holdIntermediary = anIntermediary;
      delete theBranch._merge_intermediary;
    }
    var delta = diffpatcher.diff(anIntermediary, theBranch);
    jsondiffpatch.patch(theSource, delta);
    
    if( intermediaryEmbedded === true ){
      theBranch._merge_intermediary = clone(theSource);
    }
    return true;
  };
  
  if( isObject(branch) && isObject(source) && isObject(branch._merge_intermediary) && isUndefined(intermediate) ) {
    return merge(branch, source, branch._merge_intermediary, true);
  } else if( isObject(branch) && isObject(source) && isObject(intermediate) ) {
    return merge(branch, source, intermediate, false);
  } else if( isObject(branch) && isUndefined(source) && isUndefined(intermediate) ) {
    var r = clone(branch);
    makeMergable(r);
    return r
  } else if( isObject(branch) && typeof source === 'boolean' && source === false ) {
    var r = clone(branch);
    makeMergable(r);
    return r
  } else if( isObject(branch) && typeof source === 'boolean' && source === true ) {
    makeMergable(branch);
  }
};
