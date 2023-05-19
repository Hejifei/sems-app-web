/* 工具函数 */
//校验用户名
export const checkAccount = (rule?: string, value?: string, callback?: (value: Error) => {}) => {
  // //1 非空校验
  // if (!value && callback) {
  //   callback(new Error('请输入用户名!'))
  //   //正则校验
  // } else if (!/^[a-zA-Z0-9_-|\u4E00-\u9FA5]{3,12}$/.test(value) && callback) {
  //   // eslint-disable-next-line callback-return
  //   callback(new Error('中文英文数字下划线 3至12位!'))
  // } else if (callback) {
  //   //成功调用callback()
  //   callback()
  // }
}
//校验密码
export const checkPassword = (rule?: string, value?: string, callback?: void) => {
  // //1 非空校验
  // if (!value) {
  //   // eslint-disable-next-line callback-return
  //   callback(new Error('请输入密码!'))
  //   //正则校验
  // } else if (!/^[a-zA-Z0-9_-]{6,12}$/.test(value)) {
  //   // eslint-disable-next-line callback-return
  //   callback(new Error('英文数字下划线 6至12位!'))
  // } else {
  //   //成功调用callback()
  //   // eslint-disable-next-line callback-return
  //   callback()
  // }
}
