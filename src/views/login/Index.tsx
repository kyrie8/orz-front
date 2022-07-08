import { memo } from 'react'

import { Form, Input, Button } from 'antd'
import styles from './login.module.less'

import { login, IAccount } from '@/service/login'
import { useAppDispatch } from '@/store/hook'
import { asyncLogin } from '@/store/modules/userStore'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

function Login() {
  const dispatch = useAppDispatch()
  const onFinish = async (v: IAccount) => {
    dispatch(asyncLogin(v))
  }
  return (
    <div className={styles['login-page']}>
      <div className={styles.login}>
        <div className={styles[`login-from`]}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                login in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default memo(Login)
