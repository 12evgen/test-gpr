import PokemonsStore from './PokemonsStore'
import PokemonDetailsStore from './PokemonDetailsStore'

class RootStore {
  constructor () {
    this.pokemonsStore = new PokemonsStore(this)
    this.pokemonDetailsStore = new PokemonDetailsStore(this)
  }
}

export default new RootStore()
