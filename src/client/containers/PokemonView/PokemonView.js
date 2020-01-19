import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Select, Spin, Input, Icon } from 'antd'
import PokemonList from '../PokemonList'
import Pagination from '../../components/Pagination'
import SelectPokemonTypes from '../../components/SelectPokemonTypes'
import './PokemonView.scss'

@inject('pokemonsStore')
@observer
class ProductsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 1,
      offset: 0
    }
  }

  static propTypes = {
    pokemonsStore: PropTypes.any,
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: PropTypes.string
      })
    })
  }

  componentDidMount () {
    this.props.pokemonsStore.getPokemonsList({
      limit: 964
    })
  }

  get totalPage () {
    return Math.round(this.props.pokemonsStore.pokemonsList.length / this.countPokemons)
  }

  get totalPokemons () {
    return this.props.pokemonsStore.pokemonsList.length
  }

  get countPokemons () {
    return this.props.pokemonsStore.countPokemons
  }

  handlePageChange = (page) => {
    const offset = page * this.countPokemons - this.countPokemons
    this.setState(() => ({ offset: offset }))
    this.setState(() => ({ page: page }))
  };

  filter = value => {
    this.props.pokemonsStore.countPokemons = parseInt(value)
  };

  get loadClasses () {
    return classNames('pokemons-list__body', {
      'pokemons-list__body--loading': this.props.pokemonsStore.isLoadingPokemons
    })
  }

  get pokemons () {
    const { pokemonsList, pokemonsBySearch, hasPokemonsBySearch } = this.props.pokemonsStore
    const { page, offset } = this.state
    const { Option } = Select

    if (pokemonsBySearch && hasPokemonsBySearch) {
      return pokemonsBySearch.length !== 0 ? (
        <div className='pokemon-view__list pokemons-list'>
          <div className={this.loadClasses}>
            <PokemonList pokemonsList={pokemonsBySearch} layout='grid-sm' />
          </div>
        </div>
      ) : (
        <div className='box-center'>
          <h2>Not found</h2>
        </div>
      )
    } else if (pokemonsList) {
      return (
        <React.Fragment>
          <div className='view__options'>
            <div className='view-options__filter'>
              <div className='view-options__legend'>Showing {this.props.pokemonsStore.countPokemons > this.totalPokemons ? this.totalPokemons : this.props.pokemonsStore.countPokemons} of {this.totalPokemons} pokemons</div>
              <div className='view-options__control'>
                <Select
                  defaultValue='20'
                  placeholder='Show'
                  onChange={this.filter}
                >
                  <Option value='10'>10</Option>
                  <Option value='20'>20</Option>
                  <Option value='50'>50</Option>
                </Select>
              </div>
            </div>

            <div className='view-options__types'>
              <div className='view-options__legend'>Select pokemon type</div>
              <div className='view-options__control'>
                <SelectPokemonTypes />
              </div>
            </div>
          </div>

          <div className='view__list pokemons-list'>
            <div className={this.loadClasses}>
              <PokemonList pokemonsList={pokemonsList.slice(offset, this.countPokemons + offset)} layout='grid-sm' />
            </div>
          </div>

          <div className='view__pagination'>
            <Pagination
              current={page}
              siblings={2}
              total={this.totalPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <div className='box-center'>
          <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
        </div>
      )
    }
  }

  render () {
    const { Search } = Input

    return (
      <div className='pokemons-view'>
        <div className='search-input'>
          <Search placeholder='Search for pokemon' enterButton onChange={this.props.pokemonsStore.search} />
        </div>
        {this.pokemons}
      </div>
    )
  }
}

export default ProductsView
