const {src,dest,watch,series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autorprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const terser = require('gulp-terser');

const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');

function css() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        // plumber // evita el corte de los pipe por algun error
        .pipe(sass())
        .pipe(postcss([autorprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
}

function javascript() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
}

function imagenes() {
    // const opciones = {
    //     optimizationLevel: 3 // para mejor calidad de optimizacion
    // }
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('build/img'))
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.default = series(javascript, css, dev);