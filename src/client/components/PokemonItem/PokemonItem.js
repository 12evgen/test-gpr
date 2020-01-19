import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { parseId } from '../../utils/parseId'
import './PokemonItem.scss'

const PokemonItem = ({ pokemon }) => {
  return (
    <div className='pokemon-item'>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseId(pokemon.url)}.png`}
        className='pokemon-item__avatar'
        alt={pokemon.name}
      />
      <Link
        to={`/pokemon/${parseId(pokemon.url)}`}
        className='pokemon-item__link'
      >
        {pokemon.name}
      </Link>
    </div>
  )
}

PokemonItem.propTypes = {
  pokemon: PropTypes.object.isRequired
}

export default PokemonItem
