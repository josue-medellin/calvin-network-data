'use strict';

module.exports = function(node) {
  var outputtext = '';

  var initialstorage = '';
  var endingstorage = '';
  var areacapfactor = '';

  if( node.properties.initialstorage !== undefined ) {
    initialstorage = node.properties.initialstorage.toFixed(3);
    //since initialstorage exists, then all other variables must
    //be set to 0.00 by default
    endingstorage = '0.00';
    areacapfactor = '0.00';
  }
  if( node.properties.endingstorage !== undefined ) {
    endingstorage = node.properties.endingstorage.toFixed(3);
  }
  if( node.properties.areacapfactor !== undefined ) {
    areacapfactor = node.properties.areacapfactor.toFixed(3);
  }

  outputtext += 'NODE     ' + node.properties.prmname + ' ' + initialstorage + ' ' + areacapfactor + ' ' + endingstorage + '\n';
  outputtext += 'ND       ' + node.properties.description + '\n';
  outputtext += '..       \n';

  return outputtext;
};
