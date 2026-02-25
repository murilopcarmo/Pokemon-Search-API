import { createFileRoute } from "@tanstack/react-router";
import { PokemonDetails } from "../../../pages/pokemonDetails/index.jsx";

export const Route = createFileRoute('/_layout/pokemonDetails/$name')({
  component: PokemonDetails,
});