import request from '../../request'

export default async function PokemonSpecies (id) {
  return request(`/pokemon-species/${id}`, {})
}
