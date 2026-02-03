import { useState } from "react";

export const usePokeSearch = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemon = async (query) => {
    const searchInput = query?.toLowerCase().trim();
    if (!searchInput) {
      setError("Digite o nome de um Pokémon.");
      return;
    }
    const controller = new AbortController();

    try {
      setLoading(true);
      setError("");
      setPokemon(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }

      const data = await response.json();

      setPokemon({
        id: data.id,
        name:
          data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
        image: data.sprites.front_default,
        type: data.types,
        stats: data.stats,
        cry: data.cries?.latest,
      });
    } catch (e) {
      if (e.name !== "AbortError") {
        setError("Pokémon não encontrado!");
      }
    } finally {
      setLoading(false);
    }
  };
  return { pokemon, loading, error, fetchPokemon };
};
