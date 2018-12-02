var gulp = require("gulp"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss");

gulp.task("default", ["html", "css", "js"]);

gulp.task("html", function() {
  gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("css", function() {
  var postcss_plugins = [autoprefixer({ browsers: [">1%"] }), cssnano()];

  gulp
    .src("./src/css/**/*.css")
    .pipe(postcss(postcss_plugins))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("js", function() {
  gulp
    .src("./src/js/**/*.js")
    .pipe(gulp.dest("./dist/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.html", ["html"]);
  gulp.watch("./src/**/*.css", ["css"]);
  gulp.watch("./src/**/*.js", ["js"]);
});
