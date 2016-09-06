const eslint = require('gulp-eslint');
const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');

const pkg = require('./package.json');

const expectRules = { errorOnFailure: true };
const paths = {
  jsAll: ['*.js', 'src/js/**/*.js', 'src/test/**/*.js'],
  jsPublic: ['src/js/**/*.js'],
  jsTests: ['src/test/**/*.js'],
};
const plugins = loadPlugins({ camelize: true });
const DESTINATION_FOLDER = 'public/';

gulp.task('build', () => {
  const bundleFiles = paths.jsPublic;
  const newFilename = 'critical';

  return gulp.src(bundleFiles)
    .pipe(plugins.expectFile(expectRules, bundleFiles))
    .pipe(plugins.concat(`${newFilename}.js`))
    .pipe(gulp.dest(`${DESTINATION_FOLDER}js`))
    .pipe(plugins.expectFile(expectRules, `${DESTINATION_FOLDER}js/${newFilename}.js`));
    // .pipe(plugins.uglify())
    // .pipe(plugins.concat(`${newFilename}.min.js`))
    // .pipe(gulp.dest(`${DESTINATION_FOLDER}js`))
    // .pipe(plugins.expectFile(expectRules, `${DESTINATION_FOLDER}js/${newFilename}.min.js`));
});

gulp.task('lint', () => {
  const jsFiles = paths.jsAll;

  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
  const testFiles = paths.jsTests;

  return gulp.src(testFiles, { read: false })
    .pipe(plugins.expectFile(expectRules, testFiles))
    .pipe(plugins.mocha({ reporter: 'nyan' }));
});

gulp.task('dev', () => {
  plugins.developServer.listen({ path: pkg.main });
  return gulp.watch(paths.jsAll, () => {
    gulp.start('test');
    gulp.start('build');
    plugins.developServer.restart();
  });
});
