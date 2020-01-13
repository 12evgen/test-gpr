import React from 'react'
import { Layout } from 'antd'

import './Footer.scss'

const Footer = () => {
  const { Footer } = Layout

  return (
    <div className='site-footer'>
      <Footer style={{ textAlign: 'center' }}>Pokemon App ©2020 Created by Popov Evgeniy</Footer>
    </div>
  )
}

export default Footer
