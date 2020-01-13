import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PokemonItem from '../../components/PokemonItem'
import './PokemonList.scss'

class PokemonList extends Component {
  static propTypes = {
    pokemonsList: PropTypes.array
  }

  render () {
    const { pokemonsList } = this.props

    return (
      <div className='pokemon-list'>
        <div className='wrapper'>
          {pokemonsList.map(pokemon => (
            <PokemonItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
    )
  }
}

export default PokemonList
