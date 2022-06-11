import { memo } from 'react'

function noMatch() {
  return <div>this is 404 page</div>
}
export default memo(noMatch)
