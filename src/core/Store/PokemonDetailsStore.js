import { observable, action } from 'mobx'
import Api from '../Api'

export default class PokemonDetailsStore {
  @observable pokemonDetails

  @observable pokemonSpecies

  @observable pokemonEvolution

  getPokemonDetails (id) {
    return Api.Pokeapi.PokemonDetails(id)
      .then((res) => {
        if (res.data) {
          this.setPokemonDetails(res.data)

          this.getPokemonSpecies(res.data.id)
          this.getPokemonEvolution(res.data.id)

          return res.data
        }
      })
  }

  @action setPokemonDetails = data => {
    this.pokemonDetails = data
  }

  getPokemonSpecies (id) {
    return Api.Pokeapi.PokemonSpecies(id)
      .then((res) => {
        if (res.data) {
          this.setPokemonSpecies(res.data)

          return res.data
        }
      })
  }

  @action setPokemonSpecies = data => {
    this.pokemonSpecies = data
  }

  getPokemonEvolution (id) {
    return Api.Pokeapi.PokemonEvolution(id)
      .then((res) => {
        if (res.data) {
          this.setPokemonEvolution(res.data)

          return res.data
        }
      })
  }

  @action setPokemonEvolution = data => {
    this.pokemonEvolution = data
  }
}
