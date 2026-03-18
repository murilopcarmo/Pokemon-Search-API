import axios from "axios";

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
        height
        weight

        tipos: pokemon_v2_pokemontypes { #tipos
          type: pokemon_v2_type {
              name
          }
        }

        stats: pokemon_v2_pokemonstats { #tabela de status
          base_stat
          stat: pokemon_v2_stat {
            name
          }
        }

        sons: pokemon_v2_pokemoncries { #sons
          cries
        }

        specy: pokemon_v2_pokemonspecy { #evolução
          chain: pokemon_v2_evolutionchain {
            species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
              name
              id
              variants: pokemon_v2_pokemons { #dados do Pokémon para cada espécie na cadeia de evolução
                name
                id
                forms: pokemon_v2_pokemonforms {
                  is_mega
                  form_name #retornar "galar", "alola", etc.
                
                }
              }

              evolutions_details: pokemon_v2_pokemonevolutions {
                min_level
                needs_overworld_rain
                min_affection
                min_beauty
                min_happiness
                time_of_day
                turn_upside_down
                party_type_id
                party_species_id
                trade_species_id
                relative_physical_stats
                gender_id

                trigger: pokemon_v2_evolutiontrigger {
                  name
                }
                heldItem: pokemonV2ItemByHeldItemId {
                  name
                  sprites: pokemon_v2_itemsprites {
                    sprites
                  }
                }
                item: pokemon_v2_item {
                  name
                  sprites: pokemon_v2_itemsprites {
                  sprites
                  }
                }
                location: pokemon_v2_location {
                  name
                }
              }
            }
          }
        }
      }

      species: pokemon_v2_pokemonspecies(where: {name: {_eq: "${name}"}}) { #descrição e espécie
        flavorTexts: pokemon_v2_pokemonspeciesflavortexts(
          where: {language_id: {_eq: 9}}
          order_by: {version_id: desc}
          limit: 1
        ) {
          flavor_text
        }
        speciesNames: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
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
  const evolutionTree = raw.specy?.chain?.species.map((item) => {
    // Filtra formas que não são Mega Evoluções
    const evolutionForms = item.variants.filter(variant => {
      const name = variant.name || "";
      const hasMega = variant.forms.some(f => f.is_mega);
      // Exclui formas que são Mega Evoluções, Gigantamax ou Starter Pokémon
      return !hasMega && !name.includes('gmax') && !name.includes('starter') && !name.includes('own-tempo') && !name.includes('totem');
    });
    // Filtra formas que são Mega Evoluções
    const extraForms = item.variants.filter(variant => {
      const name = variant.name || "";
      const hasMega = variant.forms.some(f => f.is_mega);
      // Exclui formas que são Mega Evoluções, Gigantamax ou Starter Pokémon
      return hasMega || name.includes('gmax') && !name.includes('starter');
    });
    console.log(extraForms);
    return {
      name: item.name,
      id: item.id,
      evolutionForms,
      extraForms,
      evolve: item.evolutions_details.map((evolution) => ({
        min_level: evolution.min_level,
        needs_overworld_rain: evolution.needs_overworld_rain,
        min_affection: evolution.min_affection,
        min_beauty: evolution.min_beauty,
        min_happiness: evolution.min_happiness,
        time_of_day: evolution.time_of_day,
        party_type_id: evolution.party_type_id,
        party_species_id: evolution.party_species_id,
        trade_species_id: evolution.trade_species_id,
        turn_upside_down: evolution.turn_upside_down,
        relative_physical_stats: evolution.relative_physical_stats,
        gender_id: evolution.gender_id,
        trigger: evolution.trigger?.name || null,
        item: evolution.item?.name || null,
        itemSprite: evolution.item?.sprites[0]?.sprites?.default || null,
        heldItem: evolution.heldItem?.name || null,
        heldItemSprite: evolution.heldItem?.sprites[0]?.sprites?.default || null,
        location: evolution.location?.name || null,
      })),
    };
  }) || [];
  // Retorna a lista de Pokémon encontrados, ou um array vazio se nenhum for encontrado
  return {
    id: raw.id,
    name: raw.name,
    types: raw.tipos.map((item) => ({
      type: { name: item.type.name },
    })),
    stats: raw.stats.map((item) => ({
      stat: { name: item.stat.name },
      base_stat: item.base_stat,
    })),
    cries: {
      latest: raw.sons[0]?.cries?.latest || null,
    },
    height: raw.height,
    weight: raw.weight,

    evolutionTree,

    description: species?.flavorTexts[0]?.flavor_text || "No description available",
    species: species?.speciesNames[0]?.genus || "Unknown",
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