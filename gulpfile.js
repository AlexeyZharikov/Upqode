const gulp = require('gulp');
const {
    src,
    dest
} = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


let production_folder = "dist";
let source = "app"

let path = {
    build: {
        html: production_folder + "/",
        css: production_folder + "/css/",
        js: production_folder + "/js/",
        img: production_folder + "/img/",
        fonts: production_folder + "/fonts"
    },
    src: {
        html: [source + "/*.html", "!" + source + "/_*.html"],
        css: source + "/sass/style.scss",
        js: source + "/js/script.js",
        img: source + "/img/**/*.{jpg,png,ico,svg}",
        fonts: source + "/fonts/*.{ttf,woff}"
    },
    watch: {
        html: source + "/**/*.html",
        css: source + "/sass/**/*.scss",
        js: source + "/js/**/*.js",
        img: source + "/img/**/*.{jpg,png,ico,svg}",
        fonts: source + "/fonts/*.{ttf,woff}"
    },
    clean: "./" + production_folder + "/"
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + production_folder + "/"
        },
        port: 3000,
    })
}

function html() {
    return src(path.src.html).pipe(fileinclude()).pipe(dest(path.build.html)).pipe(browsersync.stream());
}

function css() {
    return src(path.src.css).pipe(sass({
            outputStyle: "expanded"
        })).pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js(){
    return src(path.src.js).pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}
 function images(){
    return src(path.src.img).pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
 }

 function fonts(){
     return src(path.src.fonts).pipe(dest(path.build.fonts)).pipe(browsersync.stream());
 }
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
