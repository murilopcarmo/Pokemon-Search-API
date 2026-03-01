import { useState } from "react";
import { useDebounce } from "./hooks";
import { Container, Grid, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PokemonCard } from "../pokemonCard";
import { useQuery } from "@tanstack/react-query";
import { findPokemonByName } from "../../../../services/pokemonServices";

export const PokemonGrid = () => {
  const [input, setInput] = useState(""); // Estado para controlar o valor do input de busca do Pokémon, iniciando como uma string vazia
  const [limit, setLimit] = useState(30); // Estado para controlar o limite de exibição dos Pokémon, iniciando com 30
  const debouncedSearch = useDebounce(input, 1000); // Debounce delay de 1s

  //useQuery para buscar os Pokémon com base no nome digitado, utilizando o debounce para otimizar as requisições e evitar chamadas excessivas à API enquanto o usuário digita. A busca só é executada quando o termo de pesquisa tem 2 ou mais caracteres, e os dados anteriores são mantidos enquanto a nova busca é carregada para uma melhor experiência do usuário.
  const {
    data: pokemons = [],
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["pokemonSearch", debouncedSearch],
    queryFn: () => findPokemonByName(debouncedSearch),
    enabled: debouncedSearch.length >= 2, // Somente executa a busca se houver um termo de pesquisa com mais de 2 caracteres
    placeholderData: (prevData) => prevData, // Mantém os dados anteriores enquanto a nova busca é carregada
  });
  const [favorites, setFavorites] = useState(()=>{
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }); // Estado para controlar a lista de Pokémon favoritos, iniciando como um array vazio

  const toggleFavorite = (name) => {// Função para adicionar ou remover um Pokémon da lista de favoritos. Verifica se o Pokémon já está na lista de favoritos e, dependendo disso, atualiza a lista e o localStorage.
    let updatedFavorites;
    if (favorites.includes(name)) {
      updatedFavorites = favorites.filter((fav) => fav !== name); // Remove o Pokémon dos favoritos se já estiver na lista
    } else {
      updatedFavorites = [...favorites, name]; // Adiciona o Pokémon aos favoritos se não estiver na lista
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Atualiza o localStorage com a nova lista de favoritos
  };

  // Variável para determinar se deve mostrar os skeletons de carregamento
  const showSkeleton = (isLoading || isFetching) && pokemons.length === 0;

  //Handle para atualizar o estado do input e resetar o limite de exibição quando o usuário digitar algo novo na barra de pesquisa
  const handleChange = (event) => {
    setInput(event.target.value);
    setLimit(30); // Reinicia o limite de exibição para 30 quando aletar o input
  };

  const renderContent = () => {
    // Exibe mensagem de erro se a busca falhar
    if (isError) {
      return (
        <Typography variant="h6" color="error" sx={{ m: 2 }}>
          Error : {error.message}
        </Typography>
      );
    }
    // Exibe skeletons de carregamento enquanto os dados estão sendo buscados
    if (showSkeleton) {
      return Array.from({ length: 12 }).map(
        (
          _,
          index, // Exibe 12 skeletons enquanto os dados estão sendo carregados
        ) => (
          <Grid size={{ xs: 12, md: 2 }} key={index}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ m: 2 }}
            />
          </Grid>
        ),
      );
    }
    // Renderiza os cards de Pokémon se houver resultados
    if (pokemons.length > 0) {
      return (
        <>
          {pokemons.slice(0, limit).map(
            (
              pokemon, // Exibe apenas os Pokémon até o limite definido
            ) => (
              <Grid size={{ xs: 12, md: 2 }} key={pokemon.id}>
                <PokemonCard name={pokemon.name} id={pokemon.id} isFavorite={favorites.includes(pokemon.name)} toggleFavorite={() => toggleFavorite(pokemon.name)} />
              </Grid>
            ),
          )}
          {limit < pokemons.length && ( // Carrega mais Pokémon apenas se houver mais para mostrar
            <Grid size={{ xs: 12 }} sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="text" onClick={() => setLimit(limit + 30)}>
                Load More
              </Button>
            </Grid>
          )}
        </>
      );
    }
    // Exibe mensagem de "Nenhum Pokémon encontrado" se a busca retornar vazia e não estiver mais buscando
    if (debouncedSearch.length >= 2 && !isFetching) {
      return (
        <Typography variant="h6" sx={{ m: 2 }}>
          No Pokémon found for "{debouncedSearch}"
        </Typography>
      );
    }

    return null; // Retorna null se não houver nada para renderizar
  };

  // Render do grid de Pokémon, incluindo a barra de pesquisa e o conteúdo dinâmico baseado no estado da busca e dos dados
  return (
    <Container>
      <Typography id="text" variant="h5" sx={{ m: 2 }}>
        Which Pokémon are you looking for?
      </Typography>
      <TextField
        id="searchPokemon"
        size="small"
        variant="outlined"
        value={input}
        onChange={handleChange}
        required
      />
      <div id="bottom-box"></div>
      <Grid container spacing={2}>
        {renderContent()}
      </Grid>
    </Container>
  );
};
