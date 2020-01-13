import request from '../../request'

export default async function PokemonSpecies (id) {
  return request(`/api/v2/pokemon-species/${id}`, {})
}
