import { useAppSelector } from '@/store/hook'
import { memo, useEffect } from 'react'

interface IProps {
  children: React.ReactNode
  access: string
}

const Auth: React.FC<IProps> = (props) => {
  const auth = useAppSelector((state) => state.user.auth)
  const isAuth = auth.some((item) => item === props.access)
  return <span>{isAuth ? props.children : null}</span>
}

export default memo(Auth)
