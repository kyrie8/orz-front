import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tag } from 'antd'
import styles from './tags.module.less'
import local from '@/utils/storage'
import routes from '@/router'

type ITags = { key: string; label: string }

export interface IProps {
  isShow: boolean
  tagsObj: ITags
}

const color = 'magenta'

const fixTag = { key: routes[0].path, label: routes[0].menu_name }

const Tags: React.FC<IProps> = (props) => {
  const { isShow, tagsObj } = props
  const [tags, setTags] = useState([fixTag])
  const nav = useNavigate()
  const location = useLocation()

  useEffect(() => {
    filterTags(tagsObj)
  }, [tagsObj])

  useEffect(() => {
    const tags = local.getStorage('tags')
    if (tags) {
      setTags(tags)
    }
  }, [])

  function filterTags(obj) {
    const filterTags = tags.some((item) => item.key === obj.key)
    if (!filterTags && obj.key) {
      const arr = [...tags, obj]
      setTags(arr)
      local.setStorage('tags', arr)
    }
  }

  function close(e: React.MouseEvent<HTMLElement>, path: string, i: number) {
    e.preventDefault()
    //const length = tags.length - 1
    const arr = [...tags]
    if (path === location.pathname) {
      const { key } = arr[i - 1]
      nav(key)
    }
    arr.splice(i, 1)
    setTags(arr)
    local.setStorage('tags', arr)
  }

  if (isShow) {
    return (
      <div className={styles.tags}>
        {tags.map((item, i) => {
          return (
            <Tag
              onClick={() => nav(item.key)}
              className={styles.tag}
              key={item.key}
              color={location.pathname === item.key ? color : null}
              closable={item.key === '/home' ? false : true}
              onClose={(e) => close(e, item.key, i)}
            >
              {item.label}
            </Tag>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

export default memo(Tags)
