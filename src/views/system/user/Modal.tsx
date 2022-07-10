import { Form, Input, Modal, Radio, Select, Switch, TreeSelect } from 'antd'
import { memo, useEffect, useState } from 'react'

interface IProps {
  id: number
  visible: boolean
  ok: () => void
  cancle: () => void
}
const IsModal: React.FC<IProps> = (props) => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('新增')
  const { visible, ok, cancle } = props
  useEffect(() => {
    setTitle('编辑')
  }, [props.id])

  const handleOk = async () => {
    const v = await form.validateFields()
    console.log(v, 111)
    ok()
  }

  const handleCancle = async () => {
    form.resetFields()
    cancle()
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancle}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        initialValues={{ status: true }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
          label="用户名"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          label="密码"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item rules={[{ type: 'email' }]} name="email" label="邮箱">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="gender" rules={[{ required: true }]} label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [{ title: 'Bamboo', value: 'bamboo' }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="status" label="状态" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(IsModal)
