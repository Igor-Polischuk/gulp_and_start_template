import gulp from "gulp"

import { path } from "./gulp/config/path.js"

import { plugins } from "./gulp/config/plugins.js"


global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import {copy} from './gulp/tasks/copy.js'
import {clear} from './gulp/tasks/clear.js'
import {html} from './gulp/tasks/html.js'
import {scss} from './gulp/tasks/scss.js'
import {js} from './gulp/tasks/js.js'
import {server} from './gulp/tasks/server.js'
import {images} from './gulp/tasks/images.js'
import {svgSprive} from './gulp/tasks/svgSprive.js'
import {otfToTtf, ttfToWoff, fontStyle} from './gulp/tasks/fonts.js'
import { zip } from "./gulp/tasks/zip.js"

function watcher(){
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

export {svgSprive}

const font = gulp.series(otfToTtf, ttfToWoff, fontStyle)
const mainTasks = gulp.series(font, gulp.parallel(copy, html, scss, js, images))


const dev = gulp.series(clear, mainTasks, gulp.parallel(watcher, server) )
const build = gulp.series(clear, mainTasks)
const deployZip = gulp.series(clear, mainTasks, zip)

export {dev}
export {build}
export {deployZip}

gulp.task('default', dev)


// npm run dev -- start developer mode
// npm run build -- production mode
// npm run zip --create zip