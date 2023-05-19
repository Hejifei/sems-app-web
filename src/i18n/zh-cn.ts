import changePwd from './change_password/zh-cn'
import login from './login/zh-cn'

export default {
  home: {
    title: '首页',
    content: '我是首页',
  },
  about: {
    title: '关于我们',
    content: '我是关于我们',
  },
  ...login,
  ...changePwd,
}
