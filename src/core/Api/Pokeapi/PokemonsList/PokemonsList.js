import request from '../../request'

export default async function PokemonsList (data) {
  return request(`/api/v2/pokemon`, {
    data: data
  })
}
