import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const usePokeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: pokemon = null,
    isFetching: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pokemonUnit", searchTerm],
    queryFn: async () => {
      const searchInput = searchTerm.toLowerCase().trim();
      if (!searchInput) {
        throw new Error("Digite o nome de um Pokémon.");
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`,
      );
      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }

      const data = await response.json();

      return {
        id: data.id,
        name:
          data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
        image: data.sprites.front_default,
        type: data.types,
        stats: data.stats,
        cry: data.cries?.latest,
      };
    },
    enabled: !!searchTerm, //Converte searchTerm para booleano para controlar quando a query deve ser executada
    retry: false, //Desativa tentativas automáticas de refetch em caso de erro
    staleTime: 5 * 60 * 1000, //Define o tempo que os dados são considerados "frescos" (5 minutos)
  });

  const fetchPokemon = async (query) => {
    const trimmedQuery = query.trim(); // Remove espaços extras
    if (!trimmedQuery) return; // Evita buscar se a query estiver vazia

    setSearchTerm(trimmedQuery); // Atualiza o termo de busca, o que acionará a query
    refetch(); // Força a execução da query para buscar os dados do Pokémon
  };

  return { pokemon, loading, error: error?.message || "", fetchPokemon };
};
