import request from '../../request'

export default async function PokemonType (id) {
  return request(`/type/${id}`, {})
}
