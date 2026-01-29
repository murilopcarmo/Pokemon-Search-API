import { createLazyFileRoute } from "@tanstack/react-router";
import { PokemonSearch } from "../../../pages/pokemonSearch/index.jsx";

export const Route = createLazyFileRoute("/_layout/pokemonSearch/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PokemonSearch />;
}
