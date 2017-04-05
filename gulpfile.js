const fs = require('fs');
const path = require('path');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var del = require('del');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

const gulpNunjucks = require('gulp-nunjucks');
const nunjucks = require('nunjucks');
const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('src/views'));

nunjucksEnv.addGlobal('load_script_text', function (fileName) {
  return fs.readFileSync(path.join(__dirname, 'src/js/', `${fileName}.js`), 'utf-8');
});


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
    (function(task) {
      task_names.push(task.name);
      output_dirs.push(task.output_dir);

      gulp.task(task.name, function() {
        return gulp.src(task.paths)
          .pipe(gulp.dest(task.output_dir));
      });
    })(tasks[i]);
  }
})();

gulp.task('templates', function() {
  return gulp.src('src/views/index.html')
    .pipe(gulpNunjucks.compile({}, {
      env: nunjucksEnv
    }))
    .pipe(gulp.dest(path.join(__dirname, 'public')));
});

gulp.task('clean', function(cb) {
  del(output_dirs, cb);
});

gulp.task('default', function(callback) {
  runSequence(task_names, 'templates', callback);
});
