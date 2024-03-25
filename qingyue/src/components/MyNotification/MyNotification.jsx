import React, { useEffect } from 'react'
import { notification } from 'antd'

export default function MyNotification(notiMsg) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    // 如果type有值，打开通知
    if (notiMsg.type) {
      api[notiMsg.type]({
        message: '系统提示',
        description: notiMsg.description
      });
    }
  }, [notiMsg])
  return (
    <div>
      {contextHolder}
    </div>
  )
}
