/**
 * Add compare directory to project root. We want to be able 
 * to use our existing test server URL (thinking Docker) to
 * view the result dashboard.
 */

var gulp = require( 'gulp' ),
	rename = require('gulp-rename'),
	jeditor = require("gulp-json-editor"),
	paths = require( '../util/paths' ),

	referenceDir = paths.bitmaps_reference + '/',
	testDir = paths.bitmaps_test + '/';

gulp.task( 'copyCompare', function () {
	gulp.src([ 'compare/**/*' ])
		.pipe( gulp.dest( paths.comparePath ) );
});

gulp.task( 'copyCompareData', function () {
	gulp.src(paths.compareConfigFileName)
		.pipe(jeditor(function(json) {
			json.testPairs.forEach(function(item){
				var rFile = referenceDir + item.reference.split('/').slice(-1)[0];
				var tFile = testDir + item.test.split('/').slice(-2).join('/');
				item.local_reference = rFile;
				item.local_test = tFile;
			})
			return json;
		}))
		.pipe( rename( 'config.json' ) )
		.pipe( gulp.dest( paths.comparePath ) );
});