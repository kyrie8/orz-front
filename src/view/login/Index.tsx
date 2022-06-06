import { memo } from 'react'

import { Form, Input, Button } from 'antd'
import styles from './login.module.less'

import { login } from '@/service/login'
import { useAppDispatch } from '@/store/hook'
import { asyncLogin } from '@/store/modules/userStore'

function Login() {
  const dispatch = useAppDispatch()
  const onFinish = async (v) => {
    //const data = await login(v)
    //console.log('data', data)
    //TODO redux and Immer or immutable?
    dispatch(asyncLogin(v))
  }
  return (
    <div className={styles['login-page']}>
      <div className={styles.login}>
        <div className={styles[`login-from`]}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default memo(Login)
