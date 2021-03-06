'use strict'
const transfer = require('commander')
const pkg = require('./package')

transfer.version(pkg.version)

transfer
  .command('transfer')
  .description('tranfer the style of the "content image"')
  .option('-c, --contentImagePath <path>', 'Path to the "content image"')
  .option('-s, --styleImagePath <path>', 'Path to the "style image"')
  .option('-o, --outputImagePath <path>', 'Path to the output image')
  .option('-g, --gpu')
  .action(function (opts) {
    ;(async function () {
      const { contentImagePath, styleImagePath, outputImagePath, gpu } = opts

      if (gpu) require('@tensorflow/tfjs-node-gpu')
      else require('@tensorflow/tfjs-node')

      await require('./lib/model').run(contentImagePath, styleImagePath, outputImagePath)
    })().catch(console.error)
  })

transfer.parse(process.argv)
