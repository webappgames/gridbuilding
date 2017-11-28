var gulp = require('gulp');
var rename = require('gulp-rename');


var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var fs = require("fs");
var url = require("url");



gulp.task('default',['build']);




gulp.task('build', ['build-js-browser-production','build-js-server-development']);



var browserSync=null;
gulp.task('browser-sync', function() {

    runSequence(
        'browser-sync-init'
        ,'browser-sync-build-js-browser'
        ,'browser-sync-watch');

});


gulp.task('browser-sync-init', function (done) {

    browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");


                //if(fileName.substr(0,4)=='/api'){}


                var fileExists = fs.existsSync('./' + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/index.html";
                }
                return next();
            }
        },
        open: false
    });
    done();

});
gulp.task('browser-sync-watch', function (done) {
    gulp.watch("./src/script/**/*.js",  ['browser-sync-build-js-browser']);
    gulp.watch("./src/script/**/*.jsx", ['browser-sync-build-js-browser']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    done();
});


gulp.task('browser-sync-build-js-browser', ['build-js-browser-development'], function (done) {
    browserSync.reload();
    done();
});









const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




['browser','server'].forEach(function(target){
    ['development','production'].forEach(function(environment){





        gulp.task('build-js-'+target+'-'+environment, function() {



            return gulp.src('./src/*')
                .pipe(gulpWebpack({


                    entry: {
                        first: './src/script/'+target+'.jsx'
                    },
                    output: {
                        filename: target+(environment==='production'?'.min':'')+".js",
                        path: __dirname + "/dist",
                    },


                    target: target==='browser'?'web':'node',
                    devtool: "source-map",


                    module: {
                        loaders: [{
                            test: /\.jsx?$/,
                            loaders: ['babel?presets[]=es2015&presets[]=react'],
                            include: [
                                path.resolve(__dirname, "./src/script"),
                            ],
                            exclude: [
                                path.resolve(__dirname, "node_modules"),
                            ]
                        },{
                            test: /\.json$/,
                            loader: 'json'
                        }
                        ],
                        resolve: {
                            extensions: ['', '.js', '.jsx']
                        }
                    },



                    plugins:environment==='production'?[
                        new webpack.DefinePlugin({
                            'process.env': {
                                NODE_ENV: JSON.stringify('production')
                            }
                        }),


                        new UglifyJSPlugin({
                            sourceMap: true
                        })
                    ]:[]






                }))
                .on('error', ()=>{})//todo maybe better
        .pipe(gulp.dest('./dist/'))
            ;
        });


    });
});
