import { useEffect, useState } from 'react'

const el = document.documentElement
function useDefinedColor(key = '#25b864') {
  const [color, setColor] = useState(key)
  useEffect(() => {
    el.style.setProperty('--ant-primary-color', color)
    el.style.setProperty('--ant-primary-color-hover', color)
    el.style.setProperty('--ant-primary-color-active', color)
  }, [color])

  return [setColor]
}

export default useDefinedColor
