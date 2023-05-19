import changePwd from './change_password/en-us'
import login from './login/en-us'

export default {
  home: {
    title: 'Home',
    content: 'I\'m home',
  },
  about: {
    title: 'About US',
    content: 'I\'m about us',
  },
  ...login,
  ...changePwd,
}
