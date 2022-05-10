
let project_folder="dist";
let src_folder="#src";

let path={
build:{
  html: project_folder+"/",
  css: project_folder+"/css/",
  js: project_folder+"/js/",
  img: project_folder+"/img/",
},
src: {
  html: [src_folder+"/*.html","!"+ src_folder+"/_*.html"],
  css: src_folder+"/css/*.css",
  js: src_folder+"/js/",
  img: src_folder+"/img/**/*.{jpg,png,webp,svg}",
},
watch: {
  html: src_folder+"/**/*.html",
  css: src_folder+"/css/**/*.css",
  js: src_folder+"/js/",
  img: src_folder+"/img/**/*.{jpg,png,webp,svg}",
},
clean:"./"+project_folder+"/"
}

let {src,dest}=require('gulp'),
gulp=require('gulp'),
browsersync = require("browser-sync").create(),
fileinclude = require("gulp-file-include");

function bSync(params){
browsersync.init({
  server: {
    baseDir: "./"+project_folder+"/"
  },
  port: 3000,
  notify: false
})
}

function html(){
  return src(path.src.html)
  .pipe(fileinclude())
  .pipe(dest(path.build.html))
  .pipe(browsersync.stream())
}

function css(){
  return src(path.src.css)
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function img(){
  return src(path.src.img)
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream())
}

function watchfiles(params){
  gulp.watch([path.watch.html],html)
  gulp.watch([path.watch.css],css)
}

let build = gulp.series(gulp.parallel(css,html,img));
let watch=gulp.parallel(build,bSync,watchfiles);


exports.img=img;
exports.css=css;
exports.html=html;
exports.watch=watch;
exports.default = watch;
exports.build=build;
