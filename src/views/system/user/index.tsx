import { memo, useEffect, useState } from 'react'
import { getUserList, delUser } from '@/service/user'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tag,
} from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Column from 'antd/lib/table/Column'
import Auth from '@/views/components/Auth'
import IsModal from './Modal'

interface DataType {
  name: string
  status: number
  email: string
  user_id: number
}

const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    width: '10%',
    render: (text, record, index) => `${index + 1}`,
    key: 'index',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status ? <Tag color="blue">启用</Tag> : <Tag color="pink">禁用</Tag>}
      </>
    ),
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '操作',
    key: 'action',
  },
]

function User() {
  const [params, setParams] = useState({
    page_size: 10,
    page_num: 1,
  })
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const paginationProps = {
    current: params.page_num,
    pageSize: params.page_size,
    total: total,
    showTotal: () => `共${total}条`,
    onChange: (page) => handlerChangePage(page),
  }
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [modalData, setModal] = useState({
    visible: false,
    id: 0,
  })
  useEffect(() => {
    getList()
  }, [params])

  const getList = async (v = {}) => {
    setLoading(true)
    const res = await getUserList({ ...params, ...v })
    const {
      data: { list, total },
    } = res
    setLoading(false)
    setTotal(total)
    setData(list)
  }

  const onFinish = (v) => {
    form.setFieldsValue(v)
    getList(v)
  }

  const onReset = () => {
    form.resetFields()
    getList()
  }

  function handlerChangePage(v) {
    setParams({ ...params, page_num: v })
  }

  function confirm({ user_id }) {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认删除',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        console.log(user_id)
        const { code, msg } = await delUser(user_id)
        if (code === 200) {
          message.info(msg)
          getList()
        } else {
          message.error(msg)
        }
      },
    })
  }

  function editUser({ user_id }) {
    setModal({ id: user_id, visible: true })
  }

  function addUser() {
    setModal({ ...modalData, visible: true })
  }

  function handleOk() {
    setModal({ id: 0, visible: false })
    getList()
  }

  function handleCancle() {
    setModal({ id: 0, visible: false })
  }

  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col>
            <Form.Item name="username" label="用户名称">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item>
              <Button
                style={{ float: 'right' }}
                type="primary"
                onClick={addUser}
              >
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        <Table
          loading={loading}
          rowKey={(record) => record.user_id}
          pagination={paginationProps}
          dataSource={data}
          scroll={{ x: 'max-content', y: `calc(100vh - 390px)` }}
        >
          {columns.map((item) => {
            if (item.key === 'action') {
              return (
                <Column
                  title={item.title}
                  key={item.key}
                  render={(_, record) => (
                    <Space size="middle">
                      <Auth access="user:edit">
                        <Button onClick={() => editUser(record)}>Edit</Button>
                      </Auth>
                      <Divider type="vertical" />
                      <Auth access="user:delete">
                        <Button danger onClick={() => confirm(record)}>
                          Delete
                        </Button>
                      </Auth>
                    </Space>
                  )}
                />
              )
            } else {
              return (
                <Column
                  title={item.title}
                  key={item.key}
                  dataIndex={item.key}
                  render={item.render}
                />
              )
            }
          })}
        </Table>
      </div>
      <IsModal cancle={handleCancle} ok={handleOk} {...modalData}></IsModal>
    </div>
  )
}

export default memo(User)
