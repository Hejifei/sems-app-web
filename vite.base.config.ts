import react from '@vitejs/plugin-react'
// import {injectHtml} from 'vite-plugin-html'
import autoprefixer from 'autoprefixer'
import path from 'path'
import {defineConfig} from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
const postcssPresetEnv = require('postcss-preset-env')

// https://vitejs.dev/config/
export default defineConfig({
  // optimizeDeps: {
  //   exclude: [],  //  将指定数组中的依赖,不进行预构建
  // },
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx', '*.ts'],
    }),
    // 其他插件...
    // injectHtml({
    //   injectData: {
    //     polyfills: `
    //       <script src="/node_modules/promise-polyfill/dist/polyfill.js"></script>
    //     `,
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  envPrefix: 'ENV', //  配置vite注入客户端环境变量的env前缀, 默认 VITE开头
  css: {
    //  对css的行为进行配置
    //  modules 配置最终会丢给postcss modules
    modules: {
      //  对css模块化默认行为进行覆盖
      /**
       * localsConvention: 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
       * camelCase 讲-转化为驼峰,-格式对也存在
       * cameCaseOnly: 讲-转化为驼峰,-格式的不存在
       */
      localsConvention: 'camelCase',
      /**
       * 配置当前的模块化行为是模块化还是全局化,
       * local: 有hash就是开启了模块化的标志
       */
      scopeBehaviour: 'local',
      //  生成类名的规则
      generateScopedName: '[name]_[local]_[hash:5]',
      //  生成hash会根据你的类名、文件名、hash去进行生成,如果你想要你生成的hash独特点,你可以配置hashPrefix,你配置的这个字符串会参与到最终的hash生成
      // hashPrefix: '',
      //  不想参与的到css模块化的路径, 相对路径
      // globalModulePaths: [],
    },
    preprocessorOptions: {
      less: {
        //  webpack里给less-loader配置
        math: 'always',
        globalVars: {
          //  全局变量
          mainColors: 'red',
        },
      },
    },
    // 开启css文件索引
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'ie 11', '> 1%'],
        }),
        // require('postcss-flexbugs-fixes'),
        // postcssPresetEnv(),
        require('postcss-preset-env'),
      ],
    },
    // postcss: {
    //   plugins: [require('autoprefixer')],
    // }
    // postcss: {
    //   plugins: [
    //     postcssPresetEnv(),
    //   ]
    // }
  },
  build: {
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //   }
    // },
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', //指定生成静态资源的存放路径
    // babel: {
    //   injectPolyfill: true,
    // },
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://test.sems.192.168.221.92.nip.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api/'),
      },
    },
  },
})
