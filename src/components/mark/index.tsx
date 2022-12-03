import React, { memo } from 'react'
/**
 * 搜索高亮
 */
const Mark = memo(({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) return <>{name}</>
  const arr = name.split(keyword)
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {
            //如果是最后一个什么也不加
            index === arr.length - 1 ? null : (
              <span style={{ color: '#5297c7' }}>{keyword}</span>
            )
          }
        </span>
      ))}
    </>
  )
})

export default Mark
