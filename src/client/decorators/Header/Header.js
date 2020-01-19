import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

class Header extends Component {
  render () {
    return (
      <div className='site-header'>
        <Link to='/' className='title'>Pokedox</Link>
        <img src='/assets/img/pokemon-logo.png' alt='Pokemon' />
      </div>
    )
  }
}

export default Header
