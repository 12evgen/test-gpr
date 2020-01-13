import React, { Component } from 'react'
import { Spin, Icon } from 'antd'

export default class Loading extends Component {
  render () {
    return (
      <div className='box-center'>
        <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
      </div>
    )
  }
}
