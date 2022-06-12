import { useAppDispatch } from '@/store/hook'
import { setShowBreadAndTags } from '@/store/modules/useSetting'
import { memo, useEffect } from 'react'

type IProps = {
  children: React.ReactNode
}

function NoBreadTags(props: IProps) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setShowBreadAndTags({ showBread: false, showTags: false }))
    return () => {
      dispatch(setShowBreadAndTags({ showBread: true, showTags: true }))
    }
  }, [])
  return <div>{props.children}</div>
}

export default memo(NoBreadTags)
