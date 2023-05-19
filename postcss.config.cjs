const postcssPresetEnv = require('postcss-preset-env')
const path = require('path')

module.exports = {
  plugins: [
    postcssPresetEnv({
      importFrom: path.resolve(__dirname, './src/common/variable.css')
    })
  ]
}
