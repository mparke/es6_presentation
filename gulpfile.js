var fs = require('fs');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

// Configure all your assets here
var task_manifest = {
  vendor: {
    tasks: [
      {
        name: 'vendor_css',
        output_dir: 'public/css',
        paths: [
          'node_modules/reveal.js/css/reveal.css',
          'node_modules/reveal.js/css/theme/black.css',
          'node_modules/reveal.js/lib/css/zenburn.css'
        ]
      },
      {
        name: 'vendor_js',
        output_dir: 'public/js',
        paths: [
          'node_modules/reveal.js/plugin/highlight/highlight.js',
          'node_modules/reveal.js/lib/js/classList.js',
          'node_modules/reveal.js/lib/js/head.min.js',
          'node_modules/reveal.js/js/reveal.js'
        ]
      },
      {
        name: 'vendor_fonts',
        output_dir: 'public/font',
        paths: [
          'node_modules/reveal.js/lib/font/source-sans-pro/*'
        ]
      }
    ]
  }
};

var task_names = [];
var output_dirs = [];
(function() {
  var tasks = task_manifest.vendor.tasks;

  for (var i = 0; i < tasks.length; i++) {
    (function(task) {;
      task_names.push(task.name);
      output_dirs.push(task.output_dir);

      gulp.task(task.name, function() {
        return gulp.src(task.paths)
          .pipe(gulp.dest(task.output_dir));
      });
    })(tasks[i]);
  }
})();

gulp.task('clean', function(cb) {
  del(output_dirs, cb);
});

gulp.task('default', function(callback) {
  runSequence('clean', task_names, callback);
});
