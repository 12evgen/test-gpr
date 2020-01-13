import request from '../../request'

export default async function PokemonType (id) {
  return request(`/api/v2/type/${id}`, {})
}
