import request from '../../request'

export default async function PokemonEvolution (id) {
  return request(`/evolution-chain/${id}`, {})
}
