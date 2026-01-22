import { createLazyFileRoute } from '@tanstack/react-router'
import { PokeSearch } from '../../../pages/pokemonSearch'

export const Route = createLazyFileRoute('/_layout/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PokeSearch />
}
