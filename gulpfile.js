/** function tarea( done ){
    console.log('Mi primer tarea');

    done(); //Ponemos un callback en la funcion.
}

exports.tarea = tarea; //Sintaxis para llamar una funcion con node **/

//Css

const {src, dest, watch, parallel} = require("gulp");  // Requiere trae la funcionalidad de gulp y se lo trae para que en {} Coloque las funciones que se necesitan
const sass = require("gulp-sass") (require("sass")); //Busca la dependencia que tiene todo sobre sass
const plumber = require("gulp-plumber"); //La agregamos con: npm i --save-dev gulp-plumber
const autoprefixer = require('autoprefixer'); //Llamo las dependencias que me ayudan a mejorar el codigo css.
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp'); // Funcion para convertir imagenes a webp
const avif = require('gulp-avif');

//Compilar la hoja de archivos de sass
function css(done){

    src('src/scss/**/*.scss') //Identificar el archivo de sass
    .pipe(sourcemaps.init())
    .pipe( plumber() ) //Plumber nos permite seguir sin que se detenga la compilacion en cada error y al arreglarlo vuelve a compilar de forma automatica.
    .pipe( sass() ) // Compilacion
    .pipe( postcss([autoprefixer(), cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")) //Almacenarla en el disco duro     
    done(); //Callback que avisa a gulp cuando llegamos al final.
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png, jpg}') //Coloco la ubicacion de las imagenes a convertir y los formatos en que se encuentran.
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function versionWebp(done){ //Tarea para convertir las imagenes a webp
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png, jpg}') //Coloco la ubicacion de las imagenes a convertir y los formatos en que se encuentran.
        .pipe(webp(opciones))
        .pipe( dest('build/img'))
    done();
}

function versionAvif(done){ //Tarea para convertir las imagenes a avif
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png, jpg}') //Coloco la ubicacion de las imagenes a convertir y los formatos en que se encuentran.
        .pipe(avif(opciones))
        .pipe( dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));3

        done();
}

function dev(done){
    watch('src/scss/**/*.scss', css) //Colocamos la ruta y luego el modulo que queremos cambiar. Los ** permiten que cada cambio que se haga aplique en las demas carpetas del proyecto y compile automaticamente.
    watch('src/js/**/*.js', javascript) //Colocamos la ruta y luego el modulo que queremos cambiar. Los ** permiten que cada cambio que se haga aplique en las demas carpetas del proyecto y compile automaticamente.
    done(); //Callback que avisa a gulp cuando llegamos al final.
}

exports.css = css; //Llamar a las tareas
exports.js = javascript; //Llamar a las tareas
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionWebp = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, javascript, dev); //Con parallel puedo agregar varias tareas para que se ejecuten de forma paralela.
