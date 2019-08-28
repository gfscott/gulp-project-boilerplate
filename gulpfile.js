const { series, parallel, src, dest, watch } = require("gulp");

var rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps");

function html(done) {
  src("./src/**/*.html").pipe(dest("./dist"));
  done();
}

function compileCss(done) {
  var postcss_plugins = [autoprefixer({ browsers: [">1%"] }), cssnano()];
  src("./src/css/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(concat("style.css"))
    .pipe(dest("./dist/css"))
    .pipe(postcss(postcss_plugins))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write())
    .pipe(dest("./dist/css"));

  done();
}

function compileJs(done) {
  src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(dest("./dist/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write())
    .pipe(dest("./dist/js"));

  done();
}

exports.default = function() {
  watch("./src/**/*.html", html);
  watch("./src/**/*.css", compileCss);
  watch("./src/**/*.js", compileJs);
};

exports.build = parallel(html, compileCss, compileJs);
