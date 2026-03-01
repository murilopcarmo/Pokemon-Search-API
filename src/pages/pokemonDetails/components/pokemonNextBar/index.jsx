import { Button, Stack, Skeleton } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const PokemonNextBar = ({ id }) => {
  const navigate = useNavigate();

  const formatName = (name) => {
    if (!name) return "";

    return name
      .replace(/-/g, " ") // Substitui todos os hífens por espaço
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
  };

  // Busca o Pokémon ANTERIOR para saber o nome dele
  const { data: prevPokemon, isLoading: loadingPrev } = useQuery({
    queryKey: ["pokemon-name", id - 1],
    queryFn: () =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id - 1}`)
        .then((res) => res.data),
    enabled: id > 1, // Só busca se não for o primeiro
  });

  // Busca o PRÓXIMO Pokémon para saber o nome dele
  const { data: nextPokemon, isLoading: loadingNext } = useQuery({
    queryKey: ["pokemon-name", id + 1],
    queryFn: () =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`)
        .then((res) => res.data),
    enabled: id < 1025, // Só busca se não for o último (considerando os Pokémon até a 9ª geração)
  });

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: "100%", mt: 2 }}
    >
      {id > 1 ? (
        <Button
          variant="contained"
          disabled={loadingPrev}
          onClick={() =>
            navigate({
              to: `/pokemonDetails/$name`,
              params: { name: prevPokemon?.name },
            })
          }
        >
          {loadingPrev ? <Skeleton width={60} /> : `← ${formatName(prevPokemon?.name)}`}
        </Button>
      ) : (
        <Button
          variant="contained"
          disabled={true}
        >Start</Button>
      )}

      <Button
          variant="contained"
          onClick={() =>
            navigate({
              to: `/pokemonSearch`
            })
          }
        >Search Pokémon</Button>

      {id < 1025 ? (
        <Button
          variant="contained"
          disabled={loadingNext}
          onClick={() =>
            navigate({
              to: `/pokemonDetails/$name`,
              params: { name: nextPokemon?.name },
            })
          }
        >
          {loadingNext ? <Skeleton width={60} /> : `${formatName(nextPokemon?.name)} →`}
        </Button>
      ):
        <Button
          variant="contained"
          disabled={true}
        >End</Button>
      }
    </Stack>
  );
};
