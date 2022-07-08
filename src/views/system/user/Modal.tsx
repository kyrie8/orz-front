import { Modal } from 'antd'
import { memo, useEffect, useState } from 'react'

interface IProps {
  id: number
  visible: boolean
  ok: () => void
  cancle: () => void
}
const IsModal: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState('新增')
  const { visible, ok, cancle } = props
  useEffect(() => {
    setTitle('编辑')
  }, [props.id])
  return (
    <Modal title={title} visible={visible} onOk={ok} onCancel={cancle}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default memo(IsModal)
