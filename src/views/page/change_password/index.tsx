import {UnlockOutlined} from '@ant-design/icons'
import {Button, Form, Input} from 'antd'
import {get} from 'lodash'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

import {fetchChangePassword} from '@/apis/account'
import {PASSWORD_REG} from '@/common'
import {getUserInfo} from '@/utils'

import styles from './index.module.less'

const ChangePassword = () => {
  const {t} = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async () => {
    let values: IAccountModel.IChangePasswordData | null
    values = await form.validateFields()
    if (!values) {
      return
    }
    const userInfo = getUserInfo() || {}
    const uid = get(userInfo, ['token', 'uid'])
    console.log(uid)
    console.log('values', values)
    const {oldPassword, newPassword} = values

    const data = {
      userId: uid,
      oldPassword,
      newPassword,
    }
    try {
      await fetchChangePassword(data)
      navigate('/', {replace: true})
    } catch (err) {
      console.log('err', err)
    }
  }
  // 18020285668
  // Goodwe123
  return (
    <div className={styles.changePassword}>
      <div className={styles['title']}>
        <UnlockOutlined /> {t('changePassword.title')}
        <div className={styles.line}></div>
      </div>
      <div className={styles.changeForm}>
        <Form
          form={form}
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={`${t('changePassword.oldPwd')}`}
            name="oldPassword"
            rules={[{required: true, message: `${t('changePassword.enterOldPwd')}`}]}
          >
            <Input.Password placeholder={`${t('changePassword.enterOldPwd')}`} />
          </Form.Item>

          <Form.Item
            label={`${t('changePassword.newPwd')}`}
            name="newPassword"
            rules={[
              {required: true, message: `${t('changePassword.enterNewPwd')}`},
              {pattern: PASSWORD_REG, message: `${t('changePassword.enterNewPwd')}`},
            ]}
          >
            <Input.Password placeholder={`${t('changePassword.enterNewPwd')}`} />
          </Form.Item>

          <Form.Item
            label={`${t('changePassword.confirmation')}`}
            rules={[{required: true, message: `${t('changePassword.againNewPwd')}`}]}
          >
            <Input.Password placeholder={`${t('changePassword.againNewPwd')}`} />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button className={styles.changePwd} type="primary" htmlType="submit">
              {t('changePassword.title')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default ChangePassword
