// const postcssPresetEnv = require('postcss-preset-env')
// const path = require('path')

module.exports = {
  plugins: [
    // postcssPresetEnv({
    //   importFrom: path.resolve(__dirname, './src/common/variable.css')
    // }),
    // autoprefixer: {},
    require('postcss-flexbugs-fixes'), 
    require('postcss-preset-env')({
      // postcss-preset-env依赖了autoprefixer, 所以不需要单独安装
      autoprefixer: {
        // 或者在这里覆盖.browserslistrc
        // overrideBrowserslist: ['Chrome >= 52'],
        grid: true,
      },
    }),
  ]
}
