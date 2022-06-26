import { memo, useEffect, useState } from 'react'
import { getUserList } from '@/service/user'
import { Button, Divider, Form, Input, Space, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'

interface DataType {
  name: string
  status: number
  email: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    width: '10%',
    render: (text, record, index) => `${index + 1}`,
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
    render: (_, record) => (
      <Space size="middle">
        <span>Add</span>
        <Divider type="vertical" />
        <span>Edit</span>
        <Divider type="vertical" />
        <span>Delete</span>
      </Space>
    ),
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
  useEffect(() => {
    getList()
  }, [params])
  const getList = async (v = {}) => {
    setLoading(true)
    const {
      data: { list, total },
    } = await getUserList({ ...params, ...v })
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

  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item name="username" label="用户名称">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="M_t">
        <Table
          loading={loading}
          rowKey={(record) => record.user_id}
          columns={columns}
          pagination={paginationProps}
          dataSource={data}
        />
      </div>
    </div>
  )
}

export default memo(User)
