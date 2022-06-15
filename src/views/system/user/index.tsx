import { memo, useEffect, useState } from 'react'
import { getUserList } from '@/service/user'
function User() {
  const [page_size, setPageSize] = useState(10)
  const [page_num, setPageNum] = useState(1)
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const params = { page_num, page_size }
    const {
      data: { list, total },
    } = await getUserList(params)
  }
  return <div>user</div>
}

export default memo(User)
