var gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const jsDir = '/assets/js/';
const cssDir = '/assets/css/';

gulp.task('scripts', () =>
  gulp.src(`./src${jsDir}*.js`)
    .pipe(concat('index.js'))
    .pipe(gulp.dest(`./dist${jsDir}`))
);

gulp.task('translate', () =>
  gulp.src(`./dist${jsDir}*.js`)
    .pipe(babel({
      plugins: ["@babel/plugin-proposal-class-properties"]
    }))
    .pipe(gulp.dest(`dist${jsDir}`))
);

gulp.task('compress', () =>
  gulp.src(`./dist${jsDir}*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(`dist${jsDir}`))
);

gulp.task('minify-css', () => 
  gulp.src(`./src${cssDir}*.css`)
    .pipe(cleanCSS({ debug: true }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest(`./dist${cssDir}`))
);

gulp.task('default', gulp.series('scripts', 'translate', 'compress', 'minify-css'));