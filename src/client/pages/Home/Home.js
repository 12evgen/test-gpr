import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import PokemonView from '../../containers/PokemonView'

class Home extends Component {
  render () {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home page</title>
        </Helmet>
        <PokemonView />
      </React.Fragment>
    )
  }
}

export default Home
