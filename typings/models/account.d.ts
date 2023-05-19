declare namespace IAccountModel {
  interface ICrossLoginQuery {
    account: string
    password?: string
  }

  interface ICrossLoginResponse {}

  interface IResLogin {
    access_token: string
  }
  interface IChangePasswordData {
    userId: string
    oldPassword: string
    newPassword: string
  }
  interface IChangePasswordData {
    userId: string
    oldPassword: string
    newPassword: string
  }

  interface IModifyPassworResponse {}
  interface ILoginToken {
    client: string
    language: string
    login_mark: string
    timestamp: number
    token: string
    uid: string
    version: string
  }
  interface ILoginData {
    token: ILoginToken
    server: {
      api: string
      area: string
    }
    isEnable: boolean
    isIot: boolean
    account: string
  }
}
