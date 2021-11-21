var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var open = require('open')

// 注册任务
gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe($.concat('build.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe($.livereload())
    .pipe($.connect.reload())
})

// 注册less任务
gulp.task('lessTask', function () {
  return gulp.src('src/less/*.less')
    .pipe($.less())                // 编译less文件为css文件
    .pipe(gulp.dest('src/css'))  // 输出到css文件夹下，为与其他css文件一起执行css合并压缩
    .pipe($.livereload())
    .pipe($.connect.reload())
})

// 注册css任务
gulp.task('cssTask', ['lessTask'], function () {
  return gulp.src('src/css/*.css')
    .pipe($.concat('build.css'))                  // 合并
    .pipe($.rename({suffix: '.min'}))             // 重命名
    .pipe($.cleanCss({compatibility: 'ie8'}))     // 压缩，兼容ie8
    .pipe(gulp.dest('dist/css'))                // 输出文件到dist/css
    .pipe($.livereload())
    .pipe($.connect.reload())
})

// 注册压缩html任务
gulp.task('htmlMinify', function() {
  return gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))                  // 输出index.html到dist目录下
    .pipe($.livereload())
    .pipe($.connect.reload())
})

// 注册监听任务
gulp.task('watch', ['default'], function () {    
  // 开启监视
  $.livereload.listen()
  // 监视指定的文件, 并指定对应的处理任务
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask'])
})

// 热加载
gulp.task('server', ['default'], function () {
  // 配置加载的选项
  $.connect.server({
    root: 'dist',         // 监视的源目标文件路径，就是构建完输出的项目目录
    livereload: true,      // 是否实时刷新
    port: 3000             // 开启端口号
  })

  // 自动打开指定的链接
  open('http://localhost:3000')

  // 监视指定的文件, 并指定对应的处理任务
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask'])
})

// 注册默认任务
gulp.task('default', ['js', 'cssTask', 'htmlMinify'])
