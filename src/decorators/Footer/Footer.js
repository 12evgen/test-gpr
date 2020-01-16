import React from 'react'
import { Layout } from 'antd'

import './Footer.scss'

const Footer = () => {
  const { Footer } = Layout

  return (
    <div className='site-footer'>
      <Footer style={{ textAlign: 'center' }}>
        <span>Pokemon App ©2020 </span>
        <span>Created by Popov Evgeniy</span>
      </Footer>
    </div>
  )
}

export default Footer
