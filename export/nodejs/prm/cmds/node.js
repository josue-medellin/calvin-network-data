'use strict';

//var writeInflow = require('../../pri/lib/writeInflow');
var crawler = require('../../crawler');
var prepare = require('../lib/prepare');
var link = require('../../pri/format/link');
var path = require('path');

module.exports = function(argv) {
  if( argv._.length === 0 ) {
    console.log('Please provide a node command [list | show]');
    process.exit(-1);
  }

  if( !argv.data ) {
    console.log('Please provide a data repo location');
    process.exit(-1);
  }

  var cmd = argv._.splice(0,1)[0];
  if( cmd  === 'show' ) {
    show(argv._, argv.data);
  } else if( cmd === 'list' ) {
    list(argv.link, argv.data);
  } else {
    console.log('Unknown node command: '+cmd);
    process.exit(-1);
  }
};

function list(link, datapath) {
  crawler(datapath, {parseCsv : false}, function(results){
    var i, node;

    if( link ) {
      for( i = 0; i < results.nodes.length; i++ ) {
        node = results.nodes[i];
        if( node.properties.type === 'Diversion' || node.properties.type === 'Return Flow'  ) {
          console.log(node.properties.prmname+','+path.join(datapath, node.properties.repo.dir));
        }
      }
    } else {
      for( i = 0; i < results.nodes.length; i++ ) {
        node = results.nodes[i];
        if( node.properties.type !== 'Diversion' && node.properties.type !== 'Return Flow'  ) {
          console.log(node.properties.prmname+','+path.join(datapath, node.properties.repo.dir));
        }
      }
    }

  });
}

function show(nodes, datapath) {
  for (var i = 0 ; i < nodes.length; i++) {
    nodes[i] = nodes[i].toUpperCase();
  }

  var config = prepare.init();
  crawler(datapath, {parseCsv : false}, function(results){
    var node, i;

    for( i = 0; i < results.nodes.length; i++ ) {
      node = results.nodes[i];
      if( nodes[0] === '' || nodes[0] === 'ALL' || nodes.indexOf(node.properties.prmname.toUpperCase()) > -1 ) {
        prepare.format(node, config);
      }
    }

    console.log(prepare.pri(config));
  });
}
