const {series, parallel, watch, src, dest} = require('gulp');
const uglify = require('gulp-uglify');        //js压缩
const rename = require("gulp-rename");       //重命名
const cleanCSS = require('gulp-clean-css'); //css清除
const del = require('del');
//js处理
function jsCommand() {
    return src('src/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(dest('dist/'));
}

//css 处理
function cssCommand() {
    return src('src/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(dest('dist/'));
}
//
function clean(cb) {
    del.sync(['dist/*']);
    cb();
}
function watchChange() {
    // 监听文件修改，当文件被修改则执行
    watch(['src/*.js'],series(jsCommand));
    watch(['src/*.css'], series(cssCommand));
}

exports.change = series(watchChange);//监听实时修改实时编译
exports.build = series(clean,parallel(jsCommand, cssCommand));  //构建发布包