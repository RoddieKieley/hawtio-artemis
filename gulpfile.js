const templateCache = require('gulp-angular-templatecache');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const gulp = require('gulp');
const hawtio = require('@hawtio/node-backend');
const ngAnnotate = require('gulp-ng-annotate');
const wiredep = require('wiredep').stream;
const pkg = require('./package.json');

const config = {
  src: [
    'plugins/artemis/js/jmsHeaderSchema.js',
    'plugins/artemis/js/artemisPlugin.js',
    'plugins/artemis/js/artemisInit.js',
    'plugins/artemis/lib/artemis-console.js',
    'plugins/artemis/js/artemisService.js',
    'plugins/artemis/js/artemisHelpers.js',
    'plugins/artemis/js/tree.js',
    'plugins/artemis/js/preferences.js',
    'plugins/artemis/js/address.js',
    'plugins/artemis/js/addresses.js',
    'plugins/artemis/js/brokerDiagram.js',
    'plugins/artemis/js/browse.js',
    'plugins/artemis/js/connections.js',
    'plugins/artemis/js/consumers.js',
    'plugins/artemis/js/producers.js',
    'plugins/artemis/js/queue.js',
    'plugins/artemis/js/queues.js',
    'plugins/artemis/js/send.js',
    'plugins/artemis/js/sessions.js',
    './templates.js'
  ],
  templates: 'plugins/**/*.html',
  js: pkg.name + '.js',
  template: pkg.name + '-template.js',
  templateModule: pkg.name + '-template'
};

gulp.task('bower', function () {
  gulp.src('index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('.'));
});

gulp.task('templates', function () {
  return gulp.src(config.templates)
    .pipe(templateCache({
      filename: 'templates.js',
      root: 'plugins/',
      standalone: true,
      module: config.templateModule,
      templateFooter: '}]); hawtioPluginLoader.addModule("' + config.templateModule + '");'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['templates'], function () {
  return gulp.src(config.src)
    .pipe(concat(config.js))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', ['concat'], function () {
  return gulp.src('./templates.js', { read: false })
    .pipe(clean());
});

gulp.task('connect', function () {
  gulp.watch([config.src, config.templates], ['build']);
  gulp.watch(['libs/**/*.js', 'libs/**/*.css', 'index.html', 'dist/' + config.js], ['reload']);

  hawtio.setConfig({
    port: 2772,
    staticProxies: [
      {
        port: 8778,
        path: '/jolokia',
        targetPath: '/jolokia'
      }
    ],
    staticAssets: [{
      path: '/',
      dir: '.'

    }],
    fallback: 'index.html',
    liveReload: {
      enabled: true
    }
  });

  hawtio.listen(function (server) {
    var host = server.address().address;
    var port = server.address().port;
    console.log("started from gulp file at ", host, ":", port);
  });
});

gulp.task('reload', function () {
  gulp.src('.')
    .pipe(hawtio.reload());
});

gulp.task('build', ['templates', 'concat', 'clean']);
gulp.task('default', ['build', 'connect']);
