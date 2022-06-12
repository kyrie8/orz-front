import { memo } from 'react'
import NoBreadTags from '@/components/noBreadTags'
function noMatch() {
  return (
    <NoBreadTags>
      <div>this is 404 page</div>
    </NoBreadTags>
  )
}
export default memo(noMatch)
