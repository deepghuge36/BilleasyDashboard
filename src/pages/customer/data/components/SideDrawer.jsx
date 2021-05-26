import { Drawer } from 'antd'
import React from 'react'

export default function SideDrawer({ visible = false }) {
  return (
    <div>
      <Drawer visible={visible} closable >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid reiciendis minima assumenda voluptates consectetur porro possimus nam quae! Perferendis voluptate hic nulla vel sed reiciendis sunt culpa nobis quo similique.
      </Drawer>
    </div>
  )
}
