//引入自己样式
import {Button, Form, Input, Select} from 'antd'
import {get} from 'lodash'
import moment from 'moment'
import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

import {fetchLogin} from '@/api/account'
import lang from '@/assets/imgs/lang.png'
//导入图片
import logo from '@/assets/imgs/logo.png'
import pwd from '@/assets/imgs/pwd.png'
import user from '@/assets/imgs/user.png'
import {LOCALSTORAGE_USER_INFO, LOCALSTORAGE_X_AUTH_TOKEN} from '@/common/index'
import {i18nConfigProviderMap, LOCALSTORAGE_LANGUAGE_MAP} from '@/common/language'

import styles from './index.module.less'
const {Option} = Select

const loginForm: React.FC = () => {
  //翻译
  const {t, i18n} = useTranslation()
  //创建一个跳转实例
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = useCallback((value: string) => {
    i18n.changeLanguage(value)
    const momentLocale = get(i18nConfigProviderMap, [value, 'momentLocale']) || 'en'
    moment.locale(momentLocale)
  }, [])

  const onFinish = useCallback(async () => {
    let values: IAccountModel.ICrossLoginQuery | null = null
    values = await form.validateFields()
    if (!values) {
      return
    }
    // const uid = getUser
    const {account} = values
    values = {
      ...values,
      account: account.trim(),
    }
    try {
      setLoading(true)
      const data = await fetchLogin(values)
      const token = get(data, 'token')
      // console.log('token :>> ', token)
      window.localStorage.setItem(LOCALSTORAGE_USER_INFO, JSON.stringify(data))
      window.localStorage.setItem(LOCALSTORAGE_X_AUTH_TOKEN, JSON.stringify(token))
      //路由跳转实例
      navigate('/change-password', {replace: true})
    } catch {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [form])
  // 18013488032
  // gooodwefanfan66
  return (
    <div className={styles.pageLogin}>
      {/* logo */}
      <div className={styles.logoBox}>
        <img className={styles.logo} src={logo} alt="" />
        {/* 语言切换 */}
        <div className={styles.logLang}>
          <img className={styles.lang} src={lang} alt="" />
          <Select className={styles.langSelect} value={i18n.language} onChange={handleChange}>
            {Object.values(LOCALSTORAGE_LANGUAGE_MAP).map(item => {
              return (
                <Option className={styles.langOption} key={item.language} value={item.language}>
                  {item.name}
                </Option>
              )
            })}
          </Select>
        </div>
      </div>
      {/* 表单 */}
      <div className={styles.loginForm}>
        <div className={styles.formTitle}>
          <h1 className={styles.title}>{t('login.title')}</h1>
          <p className={styles.desc}>{t('login.welcome')}</p>
        </div>
        <div className={styles.submitForm}>
          <Form
            name="basic"
            form={form}
            labelCol={{span: 6}}
            wrapperCol={{span: 6}}
            initialValues={{remember: true}}
            autoComplete="off"
            onFinish={onFinish}
          >
            <div className={styles.userPwd}>
              <Form.Item
                name="account"
                rules={[{required: true, message: `${t('login.account')}`}]}
              >
                <div className={styles.username}>
                  <img src={user} alt="" />
                  <Input
                    className={styles.antInput}
                    placeholder={`${t('login.account')}`}
                    bordered={false}
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{required: true, message: `${t('login.password')}`}]}
              >
                <div className={styles.pwd}>
                  <img src={pwd} alt="" />
                  {
                    <Input
                      className={styles.antInput}
                      placeholder={`${t('login.password')}`}
                      type={'password'}
                      bordered={false}
                    />
                  }
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  className={styles.submitBtn}
                  type={'primary'}
                  htmlType="submit"
                  loading={loading}
                >
                  {t('login.title')}
                </Button>
              </Form.Item>
            </div>
            <p className={styles.forget}>
              <a className={styles.forgrtPwd} href="/">
                {t('login.forgetPwd')}
              </a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default loginForm
