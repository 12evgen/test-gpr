import request from '../../request'

export default async function PokemonDetails (id) {
  return request(`/pokemon/${id}`, {})
}
