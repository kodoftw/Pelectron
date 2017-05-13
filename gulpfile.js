var gulp = require('gulp');

var sass = require('gulp-sass');

var runSequence = require('run-sequence');
var del = require('del');

/**
 * Clean tasks
 */

gulp.task('clean:sass', function () {
    return del(['app/**/*.css']);
});

gulp.task('clean:dist', function () {
    return del('app/dist/*', {force: true});
});

gulp.task('clean', ['clean:dist', 'clean:sass']);

/**
 * Source file helper functions
 */

var getSassSource = function () {
    return [
        'app/**/*.scss'
    ];
};

/**
 * Lint tasks
 */

var sasslint = require('gulp-sass-lint');
gulp.task('sasslint', function () {
    var src = getSassSource();

    return gulp.src(src)
        .pipe(sasslint({
            options: {
                formatter: 'visualstudio'
            },
            files: {
                ignore: ['app/public/style/variables.scss']
            },
            config: '.sass-lint.yml'
        }))
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError())
});

/**
 * Compile tasks
 */

gulp.task('sass', function () {
    var src = getSassSource();

    return gulp.src(src, { base: './' })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function (cb) {
    runSequence(['clean', 'sasslint'], ['sass'], cb);
});

/**
 * Serve/Debug tasks
 */

var nodemon = require('gulp-nodemon')

gulp.task('serve', function () {
    return nodemon({
        exec: 'node --trace-warnings -r babel-register ./node_modules/webpack-dev-server/bin/webpack-dev-server --config webpack.config.renderer.dev.js',
        env: {
            START_HOT: true,
            NODE_ENV: 'development'
        }
    });
});

gulp.task('start', function (cb) {
    runSequence('build', 'serve', cb);
});

/**
 * @TODO: Documentations tasks
 */

/**
 * @TODO: Test tasks
 */

/**
 * @TODO: Distribution tasks
 */

gulp.task('default', ['build']);