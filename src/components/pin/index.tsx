import React, { memo } from 'react'
import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Pin = memo((props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  )
})

export default Pin
