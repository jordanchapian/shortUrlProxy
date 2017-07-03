var gulpSequence = require('gulp-sequence'),
    gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    gulpFilter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    angularFilesort = require('gulp-angular-filesort'),
    sass = require('gulp-sass'),
    del = require('del'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

// ------ Bower Dependencies -------
gulp.task("bower-files", bowerDependenciesTask("./build/", "./src"));

// ------ Move Index -------
gulp.task("src-copy-index", srcCopyIndexTask("./build/", "./src"));

// ------ Build Angular Project -------
gulp.task("src-build-js", srcBuildJsTask("./build/", "./src"));

// ------ Build Styles -------
gulp.task("src-build-styles", srcBuildStylesTask("./build/", "./src"));

// ------ Build Cleanup -------
gulp.task("cleanup", buildCleanupTask("./build/"));

// ------ Copy Fonts -------
gulp.task("copyFonts", copyFontsTask("./build/", "./src"));

// ------ Copy Grid Dependencies -------
gulp.task("copyGridDeps", copyGridDepsTask("./build/", "./src"));

gulp.task('watch', watchDevFilesTask('./src'));

gulp.task('copyImages', copyImagesTask('./build', './src'));

function copyImagesTask(dest_path, src_path){
    return function(){
        return gulp.src(src_path + "/images/**/*")
                .pipe(gulp.dest(dest_path + '/images'));
    };
}

function watchDevFilesTask(src_path){
    return function(){
        
        //watch all dynamic dev elements
        watch(src_path + '/scss/**/*.scss', batch(function (events, done) {
            gulp.start('src-build-styles', done);
        }));

        watch(src_path + '/js/**/*.js', batch(function (events, done) {
            gulp.start('src-build-js', done);
        }));

        watch(src_path + '/index.html', batch(function (events, done) {
            gulp.start('src-copy-index', done);
        }));

        watch(src_path + '/images/**/*', batch(function (events, done) {
            gulp.start('copyImages', done);
        }));
        
    }
}

function getFiletypeFilters(){
    return {
        js: gulpFilter('**/*.js', {restore: true}),
        css:gulpFilter('**/*.css', {restore: true}),
        font:gulpFilter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf'],{restore: true}),
        html:gulpFilter('**/*.html', {restore: true})
    }
}

function copyGridDepsTask(dest_path, src_path){
    var filetypeFilers = getFiletypeFilters();
    return function(){
        return gulp.src(src_path + "/bower_components/angular-ui-grid/*")
            .pipe(filetypeFilers.font)
            .pipe(gulp.dest(dest_path + '/css'));
    };
}

function copyFontsTask(dest_path, src_path){
    return function(){
        return gulp.src(src_path + "/bower_components/components-font-awesome/fonts/*")
            .pipe(gulp.dest(dest_path + '/fonts'));
    };
}

function buildCleanupTask(src_path){
    return function(){
        return del(src_path, {force:true});
    };
}

function srcBuildStylesTask(dest_path, src_path){
    return function(){
      return gulp.src(src_path + '/scss/application.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(dest_path + '/css'));
    };
}


function srcBuildJsTask(dest_path, src_path){

    return function(){
        return gulp.src(src_path + "/js/**/*.js")
                .pipe(angularFilesort())
                .pipe(concat('application.js'))
                .pipe(uglify())
                .pipe(gulp.dest(dest_path+"/js"));
    };
}

function srcCopyIndexTask(dest_path, src_path){

    return function(){
        return gulp.src(src_path + "/index.html")
                .pipe(gulp.dest(dest_path));
    };
}

function bowerDependenciesTask(dest_path, src_path){

    //File filters
    var fileFilters = getFiletypeFilters();

    //return task
    return function(){

        return gulp.src(mainBowerFiles({
            paths: {
                bowerDirectory: src_path + '/bower_components',
                bowerJson: src_path + '/bower.json'
            }
        }))
        //javascript
        .pipe(fileFilters.js)
        .pipe(concat('dependencies.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(fileFilters.js.restore)
        //css
        .pipe(fileFilters.css)
        .pipe(concat('dependencies.css'))
        .pipe(gulp.dest(dest_path + '/css'));

    };

}



gulp.task('build', gulpSequence(

    [
        'bower-files',
        'src-copy-index',
        'src-build-js',
        'src-build-styles',
        'copyFonts',
        'copyImages',
        'copyGridDeps'
    ]

));

gulp.task('dev', gulpSequence( ['build', 'watch'] ));