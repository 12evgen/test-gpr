import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

// components
import Header from '../Header'
import Footer from '../Footer'

// pages
import Home from '../../pages/Home'
import PokemonPage from '../../pages/PokemonPage'
import NotFound from '../../pages/NotFound'

@observer
class MainDecorator extends Component {
  render () {
    return (
      <section id='main'>
        <div className='main-decorator__wrapper'>
          <Header />
          <main className='main-decorator__content'>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/pokemon/:id' component={PokemonPage} exact />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </section>
    )
  }
}

export default MainDecorator
