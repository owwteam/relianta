// ========== Gulp 4 Barebone (Node 22+ Async Safe) ==========
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const fs = require("fs-extra"); // ✅ pengganti del

// Folder Paths
const paths = {
  pug: "src/pug/**/*.pug",
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
  images: "src/assets/images/**/*",
  fonts: "src/assets/fonts/**/*",
  dist: "dist/",
};

// 🧹 Hapus folder dist sebelum build
async function cleanDist() {
  await fs.remove(paths.dist);
}

// 🧱 Compile Pug → HTML
function compilePug() {
  return src(paths.pug)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// 🎨 Compile SCSS → CSS
function compileSCSS() {
  return src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// ⚙️ Copy JS
function processJS() {
  return src(paths.js).pipe(dest(paths.dist)).pipe(browserSync.stream());
}

// 🖼️ Optimize Images (pakai dynamic import async-safe)
async function optimizeImages() {
  const imagemin = (await import("gulp-imagemin")).default;
  return src(paths.images)
    .pipe(imagemin())
    .pipe(dest("dist/assets/images"))
    .pipe(browserSync.stream());
}

// 🔤 Copy Fonts
function copyFonts() {
  return src(paths.fonts)
    .pipe(dest("dist/assets/fonts"))
    .pipe(browserSync.stream());
}

// 🚀 Live Server + Watch
function serve() {
  browserSync.init({
    server: { baseDir: "dist" },
  });

  watch(paths.pug, compilePug);
  watch(paths.scss, compileSCSS);
  watch(paths.js, processJS);
  watch(paths.images, optimizeImages);
  watch(paths.fonts, copyFonts);
}

// 🧱 Tasks
exports.default = series(
  cleanDist,
  parallel(compilePug, compileSCSS, processJS, optimizeImages, copyFonts),
  serve
);

exports.build = series(
  cleanDist,
  parallel(compilePug, compileSCSS, processJS, optimizeImages, copyFonts)
);
