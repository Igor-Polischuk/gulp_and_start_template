import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
    return app.gulp.src(app.path.src.images, {soursemap: true})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'Images',
            message: "ERROR: <%= error.message %>"
        })))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
        app.plugins.if(
            app.isBuild,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true,
                svgtoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}


    // .pipe(webp())
    // .pipe(app.gulp.dest(app.path.build.images))
    // .pipe( app.gulp.src(app.path.src.images))
    // .pipe(app.plugins.newer(app.path.build.images))
    // .pipe(imagemin({
    //     progressive: true,
    //     svgtoPlugins: [{removeViewBox: false}],
    //     interlaced: true,
    //     optimizationLevel: 3 // 0 to 7
    // }))