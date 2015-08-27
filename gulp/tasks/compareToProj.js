/**
 * Add compare directory to project root. We want to be able 
 * to use our existing test server URL (thinking Docker) to
 * view the result dashboard.
 */

var gulp = require( 'gulp' );

gulp.task( 'copyCompare', function () {
	gulp.src([ 'compare/**/*' ])
		.pipe( gulp.dest( '../compare' ) );
});