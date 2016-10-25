'use strict';

// plugins
var gulp    = require('gulp');
var dirSync = require('gulp-directory-sync');
var Hjson   = require('gulp-hjson');
var staticHash = require('gulp-static-hash');
var runSequence = require('run-sequence');
var hashCreator = require("gulp-hash-creator");

// settings
var devlop_dir  ="docs/";
var release_dir ="";

//------------------
//    Insert cache breaker
//------------------
gulp.task('insertCacheBreaker', function() {
    var target = devlop_dir+"index.html";
    console.log(target);
    return gulp.src(target)
        .pipe(staticHash({asset: 'static'}))
        .pipe(gulp.dest(devlop_dir));
});

//------------------
//    sync
//------------------
gulp.task('sync', function() {
    return gulp.src( '' )
        .pipe(dirSync(devlop_dir, release_dir ,{ printSummary: true }))
    ;
});

//------------------
//    Make hash list
//------------------
gulp.task('makeHashList', function() {
  var config = {
      forceUpdate: true,
      length:16,
      hashName: 'md5',
      output: devlop_dir+ 'js/chunkof_FileHashList.js',
      outputTemplate: "var chunkof_FileHashList = [\n{{{hashList}}}{/*dummy*/}\n];",
      delimiter: "",
      log: false,
      format: function (obj) {
        var fileName =  obj.path.match(".+/(.+?)([\?#;].*)?$")[1];
        return "{"
          + "name:" + "'" + fileName + "'" + ","
          + "hash:" + "'" + obj.hash + "'"
          + "},\n";
    }
  };

  return gulp.src([
    devlop_dir+ 'js/plugins/*.js',
    devlop_dir+ 'data/*.json'
    ])
    .pipe(hashCreator(config))
    ;
});


//------------------
//    build
//------------------
gulp.task('build', function() {
  runSequence('makeHashList','insertCacheBreaker');
});

//------------------
//    deploy
//------------------
gulp.task('deploy', function() {
  runSequence('makeHashList','insertCacheBreaker','sync');
});

//------------------
//    human readable json
//------------------
gulp.task('hjson', function() {
    return gulp.src(devlop_dir + 'data/*.json')
      .pipe(Hjson({ to: 'hjson' }))
      .pipe(gulp.dest(devlop_dir + 'data_h/'));
});
