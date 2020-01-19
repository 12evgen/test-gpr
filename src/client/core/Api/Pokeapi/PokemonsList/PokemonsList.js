import request from '../../request'

export default async function PokemonsList (data) {
  return request(`/pokemon`, {
    data: data
  })
}
