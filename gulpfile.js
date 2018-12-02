var gulp = require("gulp"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["html", "css", "js"]);

gulp.task("html", function() {
  gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("css", function() {
  var postcss_plugins = [autoprefixer({ browsers: [">1%"] }), cssnano()];

  gulp
    .src("./src/css/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(postcss(postcss_plugins))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("js", function() {
  gulp
    .src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.html", ["html"]);
  gulp.watch("./src/**/*.css", ["css"]);
  gulp.watch("./src/**/*.js", ["js"]);
});
