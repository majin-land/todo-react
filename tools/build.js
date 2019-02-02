const fs = require('fs')
const rimraf = require('rimraf')
const webpack = require('webpack')

const task = require('./task')
const webpackConfig = require('./webpack.config')

global.DEBUG = false

// Copy ./index.html into the /public/dist folder
const html = task('html', () => {
  fs.createReadStream('./public/favicon.ico').pipe(fs.createWriteStream('./public/dist/favicon.ico'))
})

// Bundle JavaScript, CSS and image files with Webpack
const bundle = task('bundle', () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.hasErrors()) {
        const info = stats.toJson()
        reject(new Error(info.errors))
      } else {
        console.log(stats.toString(webpackConfig.stats))
        resolve()
      }
    })
  })
})

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
module.exports = task('build', () => {
  rimraf.sync('public/dist/*', { nosort: true, dot: true })
  return Promise.resolve()
    .then(bundle)
    .then(html)
})
