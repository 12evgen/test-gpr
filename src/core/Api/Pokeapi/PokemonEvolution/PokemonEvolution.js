import request from '../../request'

export default async function PokemonEvolution (id) {
  return request(`/api/v2/evolution-chain/${id}`, {})
}
