import { useState } from 'react'
import { Button, Input } from 'antd'
import { SketchPicker } from 'react-color'
import useDefinedColor from './hook/useDefinedColor'

function App() {
  const [setColor] = useDefinedColor()
  const [showColor, setShowColor] = useState(false)
  return (
    <>
      <div>
        <Button onClick={() => setShowColor(!showColor)} type="primary">
          按钮
        </Button>
        <Input placeholder="请输入"></Input>
      </div>
      {showColor && (
        <SketchPicker
          onChangeComplete={(color) => setColor(color.hex)}
        ></SketchPicker>
      )}
    </>
  )
}

export default App
