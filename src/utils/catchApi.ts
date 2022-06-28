import { IData } from '@/service/type'
import { history } from '@/App'
import { Modal } from 'antd'
function catchApi(promise) {
  return promise
    .then((res: IData) => [res, null])
    .catch((err: any) => {
      if (err.response.data.code === 401) {
        Modal.info({
          title: '提示',
          content: `用户登录信息过期`,
          onOk() {
            history.replace('/login')
          },
        })
      }
    })
}

export default catchApi
