var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
async function sassCSS() {
    return await gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
};
async function css()
{
    return await gulp.src('src/css/*.css')
    .pipe( browserSync.stream());

}

// Move the javascript files into our /src/js folder
 async function js () {
    return await gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
};
// Starts a BrowerSync instance

// Static Server + watching scss/html files
 async function serve (cb) {

    await browserSync.init({
        server: "./src"  
    });

   // await gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], sassCSS);
    await gulp.watch(['src/css/*.css'], css);
    await gulp.watch("src/*.html").on('change',(path,stats)=> browserSync.reload());
};

exports.default = gulp.series(serve);
