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
      main: pokemon_v2_pokemon(where: {name: {_eq: "${name}"}}) {
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
        height
        weight
        pokemon_v2_pokemonspecy {
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies(order_by: {order: asc}) {
            name
            }
          }
        }
      }
      species: pokemon_v2_pokemonspecies(where: {name: {_eq: "${name}"}}) {
        pokemon_v2_pokemonspeciesflavortexts(
          where: {language_id: {_eq: 9}} # Filtra para obter apenas as descrições em inglês e mais recentes
          order_by: {version_id: desc}
          limit: 1
        ) {
          flavor_text
        }
        pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
          genus
        }
      }
    }`,
  };
  // Faz a requisição POST para a API GraphQL do PokeAPI com a query montada e aguarda a resposta
  const response = await axios.post(
    "https://beta.pokeapi.co/graphql/v1beta",
    query,
  );
  const {
    main: [raw],
    species: [species],
  }= response.data.data;
  
  if (!raw) {
    throw new Error("Pokémon not found"); // Retorna null se nenhum Pokémon for encontrado com o nome fornecido
  }
  // Retorna a lista de Pokémon encontrados, ou um array vazio se nenhum for encontrado
  return {
    id: raw.id,
    name: raw.name,
    types: raw.pokemon_v2_pokemontypes.map((item) => ({
      type: { name: item.type.name },
    })),
    stats: raw.pokemon_v2_pokemonstats.map((item) => ({
      stat: { name: item.stat.name },
      base_stat: item.base_stat,
    })),
    cries: {
      latest: raw.pokemon_v2_pokemoncries[0]?.cries?.latest || null,
    },
    height: raw.height,
    weight: raw.weight,
    evolutionChain: raw.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies.map((item) => ({
      name: item.name,
    })) || [],
    description: species?.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text || "No description available",
    species: species?.pokemon_v2_pokemonspeciesnames[0]?.genus || "Unknown",
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

// Função para buscar os Pokémon anterior e próximo com base no ID do Pokémon atual, usando GraphQL
export const findNavigation = async (id) => {
  if (!id || id.toString().trim() === "") {
    return [];
  }

  const query = {
    query: `{
      prev: pokemon_v2_pokemon(where: {id: {_eq: ${id - 1}}}) {
        id,
        name
      }
      next: pokemon_v2_pokemon(where: {id: {_eq: ${id + 1}}}) {
        id,
        name
      }
    }`,
  };

  const response = await axios.post(
    "https://beta.pokeapi.co/graphql/v1beta",
    query,
  );
  const { prev, next } = response.data.data;
  return {
    prev: prev[0] || null,
    next: next[0] || null,
  };
};