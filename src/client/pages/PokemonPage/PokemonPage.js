import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Spin, Progress, Icon, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { parseId } from '../../utils/parseId'
import './PokemonPage.scss'

@inject('pokemonDetailsStore')
@observer
class PokemonPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  static propTypes = {
    pokemonDetailsStore: PropTypes.any,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    })
  };

  colorType = {
    1: '#f50',
    2: '#2db7f5',
    3: '#87d068',
    4: '#108ee9'
  }

  colorAbilities = {
    1: 'magenta',
    2: 'green',
    3: 'cyan',
    4: 'purple'
  }

  componentDidMount () {
    reaction(() => this.props.match.params.id, async (data) => {
      this.props.pokemonDetailsStore.getPokemonDetails(this.props.match.params.id)
      this.setState(() => ({ loading: true }))
    }, { fireImmediately: true })
    reaction(() => this.props.pokemonDetailsStore.pokemonDetails, async (data) => {
      this.setState(() => ({ loading: false }))
    }, { fireImmediately: true })
  }

  componentWillUnmount () {
    this.setState(() => ({ loading: true }))
    this.props.pokemonDetailsStore.pokemonDetails = null
    this.props.pokemonDetailsStore.pokemonSpecies = null
    this.props.pokemonDetailsStore.pokemonEvolution = null
  }

  get evolution () {
    const { chain } = this.props.pokemonDetailsStore.pokemonEvolution
    const firstGen = chain
    const evolution = [firstGen]
    if (evolution[0].evolves_to.length !== 0) {
      evolution[0].evolves_to.forEach(evol => {
        evolution.push(evol)
      })
      if (evolution[1].evolves_to.length !== 0) {
        evolution[1].evolves_to.forEach(evol => {
          evolution.push(evol)
        })
      }
    }

    return evolution
  }

  render () {
    const { pokemonDetails, pokemonSpecies, pokemonEvolution } = this.props.pokemonDetailsStore
    const { loading } = this.state

    return !loading && pokemonDetails && pokemonSpecies && pokemonEvolution ? (
      <React.Fragment>
        <Helmet>
          <title>{pokemonDetails.name} - Pokemon</title>
        </Helmet>
        <div className={`pokemon-detais pokemon-detais--${pokemonSpecies.color.name}`}>
          <div className={`wrapper`}>
            <div className='pokemon-detais__name'>
              <div className='pokemon-detais__main'>
                <div className='pokemon-detais__avatar'>
                  <img
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonDetails.id}.png`}
                    alt={pokemonDetails.name}
                  />
                </div>
                <div className='pokemon-detais__desc'>
                  <h1 className='pokemon-detais__title'>
                    {`${pokemonDetails.name} #${pokemonDetails.id}`}
                  </h1>

                  {/* Desc */}
                  <div className='pokemon-detais__text'>
                    {pokemonSpecies.flavor_text_entries[1].language.name === 'en'
                      ? pokemonSpecies.flavor_text_entries[1].flavor_text
                      : pokemonSpecies.flavor_text_entries[2].flavor_text}
                  </div>

                  {/* Specifications */}
                  <div className='pokemon-detais__specifications'>
                    <h3 className='pokemon-detais__specifications-title'>Profile</h3>
                    <div className='pokemon-detais__specifications-wrapper'>
                      <div className='pokemon-detais__specifications-item'>
                        <div className='pokemon-detais__specifications-name'>Height</div>
                        <div className='pokemon-detais__specifications-value'>{`${pokemonDetails.height / 10} m`}</div>
                      </div>
                      <div className='pokemon-detais__specifications-item'>
                        <div className='pokemon-detais__specifications-name'>Weight</div>
                        <div className='pokemon-detais__specifications-value'>{`${pokemonDetails.weight / 10} kg`}</div>
                      </div>
                      <div className='pokemon-detais__specifications-item'>
                        <div className='pokemon-detais__specifications-name'>Gender Rate</div>
                        <div className='pokemon-detais__specifications-value'>
                          {pokemonSpecies.gender_rate !== -1 ? (
                            `${pokemonSpecies.gender_rate}%`
                          ) : (
                            <span>Gender Unknown</span>
                          )}
                        </div>
                      </div>
                      <div className='pokemon-detais__specifications-item'>
                        <div className='pokemon-detais__specifications-name'>Capture Rate</div>
                        <div className='pokemon-detais__specifications-value'>
                          {`${pokemonSpecies.capture_rate}%`}
                        </div>
                      </div>
                      <div className='pokemon-detais__specifications-item'>
                        <div className='pokemon-detais__specifications-name'>Egg Groups:</div>
                        <div className='pokemon-detais__specifications-value'>
                          {pokemonSpecies.egg_groups[0].name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Types */}
                  <div className='pokemon-detais__types'>
                    <h3 className='pokemon-detais__types-title'>Type</h3>
                    <div className='pokemon-detais__types-wrapper'>
                      {pokemonDetails.types.map(type => {
                        return (
                          <Tag key={type.slot} color={this.colorType[type.slot]}>{type.type.name}</Tag>
                        )
                      })}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className='pokemon-detais__abilities'>
                    <h3 className='pokemon-detais__abilities-title'>Abilities</h3>
                    <div className='pokemon-detais__abilities-wrapper'>
                      {pokemonDetails.abilities.map(ability => {
                        return (
                          <Tag key={ability.slot} color={this.colorAbilities[ability.slot]}>{ability.ability.name}</Tag>
                        )
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className='pokemon-detais__evolution'>
              <h3 className='pokemon-detais__evolution-title'>Evolution</h3>
              <div className='pokemon-detais__evolution-wrapper'>
                {this.evolution.map(gen => {
                  const { name, url } = gen.species
                  return (
                    <div className='pokemon-detais__evolution-item' key={name}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseId(url)}.png`}
                        className='pokemon-detais__evolution-avatar'
                        alt={name}
                      />
                      <Link to={`/pokemon/${parseId(url)}`} className='pokemon-detais__evolution-link'>
                        {name}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='pokemon-detais__stats'>
              <h3 className='pokemon-detais__stats-title'>Statistics</h3>
              <div className='pokemon-detais__stats-wrapper'>
                {pokemonDetails.stats.map(stat => {
                  return (
                    <div className='pokemon-detais__stats-item' key={stat.stat.name}>
                      <div className='pokemon-detais__stats-name'>
                        {stat.stat.name}
                      </div>
                      <div className='pokemon-detais__stats-progress'>
                        <Progress percent={stat.base_stat} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className='box-center'>
        <Spin indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />} />
      </div>
    )
  }
}

export default PokemonPage
