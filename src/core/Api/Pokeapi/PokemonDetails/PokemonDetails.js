import request from '../../request'

export default async function PokemonDetails (id) {
  return request(`/api/v2/pokemon/${id}`, {})
}
