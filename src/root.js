import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import App from './decorators'

const supportsHistory = 'pushState' in window.history

@observer
class Root extends Component {
  componentDidMount () {
    // preloader
    setTimeout(() => {
      const preloader = document.querySelector('.site-preloader')
      window.addEventListener('login', (event) => {
        if (event.detail) {
          preloader.parentNode.removeChild(preloader)
        }
      })
    })
  }

  render () {
    return (
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Route component={App} />
      </BrowserRouter>
    )
  }
}

export default Root
