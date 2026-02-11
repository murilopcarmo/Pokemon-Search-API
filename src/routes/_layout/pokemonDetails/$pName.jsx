import { createFileRoute } from "@tanstack/react-router";
import { PokemonDetails } from "../../../pages/pokemonDetails/index.jsx";

export const Route = createFileRoute('/_layout/pokemonDetails/$pName')({
  loader: async ({ params }) => { // Carrega os dados do Pokémon usando o nome como parâmetro
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pName}`);
    if (!res.ok) {
      throw new Error('Pokémon não encontrado');
    }
    return res.json();
  },
  component: PokemonDetails,
});