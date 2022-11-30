import { useUsers } from '@/hooks/use-users'
import React, { memo } from 'react'
import IdSelect from '../id-select'

const UserSelect = memo((props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props} />
})

export default UserSelect
