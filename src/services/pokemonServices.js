import axios from "axios";

export const findAllPokemon = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1025",
  );
  return response.data.results;
};

export const findPokemonFullData = async (name) => {
  // Verifica se o nome é vazio ou apenas espaços em branco, e retorna um array vazio para evitar chamadas desnecessárias à API
  if (!name || name.trim() === "") {
    return [];
  }
  // Monta a query GraphQL para buscar Pokémon cujo nome corresponda ao termo de pesquisa, usando uma expressão regular para permitir buscas parciais e case-insensitive
  const query = {
    query: `{
        pokemon_v2_pokemon(where: {name: {_iregex: "${name}"}}) {
            id,
            name
            pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            pokemon_v2_pokemonstats {
                base_stat
                stat: pokemon_v2_stat {
                    name
                }
            }
            pokemon_v2_pokemoncries {
                cries
            }
        }
    }`,
  };
  // Faz a requisição POST para a API GraphQL do PokeAPI com a query montada e aguarda a resposta
  const response = await axios.post(
    "https://beta.pokeapi.co/graphql/v1beta",
    query,
  );
  const raw = response.data.data.pokemon_v2_pokemon[0];
  if (!raw) {
    return null; // Retorna null se nenhum Pokémon for encontrado com o nome fornecido
  }
  // Retorna a lista de Pokémon encontrados, ou um array vazio se nenhum for encontrado
  return {
    id: raw.id,
    name: raw.name,
    types: raw.pokemon_v2_pokemontypes.map((item) => ({
      type: {name: item.type.name},
    })),
    stats: raw.pokemon_v2_pokemonstats.map((item) => ({
      stat: {name: item.stat.name},
      base_stat: item.base_stat,
    })),
    cries: {
      latest: raw.pokemon_v2_pokemoncries[0]?.cries?.latest || null,
    },
  };
};

// Função para buscar Pokémon por nome usando GraphQL
export const findPokemonByName = async (name) => {
  // Verifica se o nome é vazio ou apenas espaços em branco, e retorna um array vazio para evitar chamadas desnecessárias à API
  if (!name || name.trim() === "") {
    return [];
  }
  // Monta a query GraphQL para buscar Pokémon cujo nome corresponda ao termo de pesquisa, usando uma expressão regular para permitir buscas parciais e case-insensitive
  const query = {
    query: `{
        pokemon_v2_pokemon(where: {name: {_iregex: "${name}"}}) {
            id,
            name
        }
    }`,
  };
  // Faz a requisição POST para a API GraphQL do PokeAPI com a query montada e aguarda a resposta
  const response = await axios.post(
    "https://beta.pokeapi.co/graphql/v1beta",
    query,
  );
  // Retorna a lista de Pokémon encontrados, ou um array vazio se nenhum for encontrado
  return response.data.data.pokemon_v2_pokemon;
};
