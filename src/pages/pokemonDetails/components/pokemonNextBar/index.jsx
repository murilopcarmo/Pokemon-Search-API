import { Button, Stack, Skeleton } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { findNavigation } from "../../../../services/pokemonServices";

export const PokemonNextBar = ({ id }) => {
  const navigate = useNavigate();

  const formatName = (name) => {
    if (!name) return "";

    return name
      .replace(/-/g, " ") // Substitui todos os hífens por espaço
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
  };

  // Usa React Query para buscar os dados de navegação (Pokémon anterior e próximo) com base no ID do Pokémon atual
  const { data: navigation, isLoading: loadingNav } = useQuery({
    queryKey: ["pokemon-navigation", id],
    queryFn: () => findNavigation(id),
    enabled: !!id, // A query só é executada se o ID for válido (não nulo ou vazio)
    retry: false, // Evita tentativas automáticas de refetch em caso de erro
    refetchOnWindowFocus: false, // Evita refetch ao focar a janela
    staleTime: 1000*60*5, // 5 minutos, para evitar refetch desnecessário se o usuário voltar para um Pokémon já visitado recentemente
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
          disabled={loadingNav}
          onClick={() =>
            navigate({
              to: `/pokemonDetails/$name`,
              params: { name: navigation?.prev.name },
            })
          }
        >
          {loadingNav ? <Skeleton width={60} /> : `← ${formatName(navigation?.prev.name)} #${navigation?.prev.id}`}
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
          disabled={loadingNav || !navigation?.next}
          onClick={() =>
            navigate({
              to: `/pokemonDetails/$name`,
              params: { name: navigation?.next.name },
            })
          }
        >
          {loadingNav ? <Skeleton width={60} /> : `${formatName(navigation?.next.name)} #${navigation?.next.id} →`}
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
