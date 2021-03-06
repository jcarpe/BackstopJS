var path = require('path');
var fs = require('fs');

var paths = {};

// BACKSTOP MODULE PATH
paths.backstop                      = path.join(__dirname, '../..');

// BACKSTOP CONFIG PATH
paths.backstopConfigFileName        = path.join(paths.backstop, '..', 'backstop.json');

// BITMAPS PATHS -- note: this path is overwritten if config files exist.  see below.
paths.bitmaps_reference             = paths.backstop + '/bitmaps_reference';
paths.bitmaps_test                  = paths.backstop + '/bitmaps_test';

// COMPARE PATHS -- note: compareConfigFileName is overwritten if config files exist.  see below.
paths.comparePath                   = paths.backstop + '../../compare';
paths.compareConfigFileName         = paths.comparePath + '/config.json';
paths.compareReportURL              = 'http://localhost:3001/compare/';

// CAPTURE CONFIG PATHS
paths.captureConfigFileName         = paths.backstop + '/capture/config.json';
paths.captureConfigFileNameCache    = paths.backstop + '/capture/.config.json.cache';
paths.captureConfigFileNameDefault  = paths.backstop + '/capture/config.default.json';

// SERVER PID PATH
paths.serverPidFile                 = paths.backstop + '/server.pid';

// ACTIVE CAPTURE CONFIG PATH
paths.activeCaptureConfigPath       = '';

if(!fs.existsSync(paths.backstopConfigFileName)){
  console.log('\nCould not find a valid config file.');
  console.log('\nTo run your own tests create a config here...\n ==> '+paths.backstopConfigFileName);
  console.log('\nRun `$ gulp genConfig` to generate a config template file in this location.\n');
  paths.activeCaptureConfigPath = paths.captureConfigFileNameDefault;
}else{
  console.log('\nBackstopJS Config loaded.\n')
  paths.activeCaptureConfigPath = paths.backstopConfigFileName;
}

// overwrite default filepaths if config files exist
if(fs.existsSync(paths.activeCaptureConfigPath)){
  var configJSON = fs.readFileSync(paths.activeCaptureConfigPath, "utf8");
  var config = JSON.parse(configJSON);
  if (config.paths) {
    paths.bitmaps_reference = config.paths.bitmaps_reference || paths.bitmaps_reference;
    paths.bitmaps_test = config.paths.bitmaps_test || paths.bitmaps_test;
    paths.compareConfigFileName = config.paths.compare_data || paths.compareConfigFileName;
  }

  // print out the updated pathing from config
  console.log(
    '\n----Altered Paths from Config-----' +
    '\nbitmap reference:      ' + paths.bitmaps_reference +
    '\nbitmap test:           ' + paths.bitmaps_test +
    '\ncompareConfigFileName: ' + paths.compareConfigFileName +
    '\n----------------------------------'
  );

  paths.engine = config.engine || null;
}

module.exports = paths;
