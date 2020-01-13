import { observable, action, reaction, toJS } from 'mobx'
import { differenceWith, isEqual } from 'lodash'
import Api from '../Api'

export default class PokemonsStore {
  @observable pokemonsList

  @observable pokemonsBySearch

  @observable hasPokemonsBySearch

  @observable countPokemons = 20

  @observable totalPokemons

  @observable isLoadingPokemons = false

  @observable pokemonsByType

  @observable totalPokemonsByType = []

  @observable nameTypePokemon = []

  constructor () {
    reaction(() => this.pokemonsByType, async (data) => {
      this.totalPokemonsByType = this.totalPokemonsByType.concat(toJS(data))
      this.pokemonsList = this.totalPokemonsByType
      this.totalPokemons = this.totalPokemonsByType.length
    })
  }

  getPokemonsList (data) {
    this.isLoadingProducts = true
    return Api.Pokeapi.PokemonsList(data)
      .then((res) => {
        if (res.data) {
          this.isLoadingPokemons = false

          this.setPokemons(res.data.results)
          this.totalPokemons = res.data.count

          return res.data
        }
      })
  }

  @action setPokemons = data => {
    this.pokemonsList = data
  }

  @action search = e => {
    const { value } = e.target
    this.pokemonsBySearch = toJS(this.pokemonsList).filter((el) => {
      if (value.length > 0) {
        if (el.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          this.hasPokemonsBySearch = true
          return el.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        } else {
          return null
        }
      } else {
        this.hasPokemonsBySearch = false
        return null
      }
    })
  }

  @action getPokemonsFromType (id) {
    return Api.Pokeapi.PokemonType(id)
      .then((res) => {
        if (res.data) {
          this.pokemonsByType = res.data.pokemon.map(item => {
            return item.pokemon
          })

          this.nameTypePokemon.push(
            {
              id: res.data.id,
              name: res.data.name,
              pokemons: this.pokemonsByType
            }
          )

          return res.data
        }
      })
  }

  @action removePokemonsFromType (idType) {
    let forDel

    toJS(this.nameTypePokemon).map(key => {
      if (key.id === idType[0]) {
        forDel = key.pokemons
      }
    })

    this.pokemonsList = differenceWith(toJS(this.pokemonsList), forDel, isEqual)
  }
}
