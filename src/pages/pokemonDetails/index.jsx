import { useParams } from "@tanstack/react-router";
import { PokemonType } from "./components/pokemonType";
import { PokemonNextBar } from "./components/pokemonNextBar";
import { PokemonImg } from "./components/pokemonImg";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { TypeContainer } from "./styles";
import { Typography, Container, Paper, Box } from "@mui/material";
import { findPokemonFullData } from "../../services/pokemonServices";
import { useQuery } from "@tanstack/react-query";

export const PokemonDetails = () => {
  const { name } = useParams({ from: "/_layout/pokemonDetails/$name" }); // Obtém o nome do Pokémon a partir dos parâmetros da rota
  const {
    data: pokemon,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetails", name],
    queryFn: () => findPokemonFullData(name), // Busca os dados completos do Pokémon usando o nome como parâmetro
    retry: false, // Desativa tentativas automáticas de refetch em caso de erro
    refetchOnWindowFocus: false, // Desativa refetch ao focar a janela
  });
  if (isLoading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Buscando dados de "{name}"...</Typography>
      </Container>
    );
  if (isError) {
    return (
      <Container
        id="error-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>
          {error?.message || "Erro ao buscar dados do Pokémon"}
        </Typography>
      </Container>
    );
  }

  const formatName = (name) => {
    if (!name) return "";

    return name
      .replace(/-/g, " ") // Substitui todos os hífens por espaço
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
  };

  return (
    <Container id="pokemon-details-container">
      <Paper id="pokemon-details">
        {/*Container de dados*/}
        <Box className="pokemon-info">
          <PokemonNextBar id={pokemon.id} />
          {/*nome*/}
          <Typography variant="h5">{formatName(pokemon.name)}</Typography>
          <br />
          {/*Sprite*/}
          <PokemonImg id={pokemon.id} alt={formatName(pokemon.name)} />
          <br />
          {/*Tipos*/}
          <TypeContainer>
            {pokemon.types.map((item, index) => (
              <PokemonType key={index} types={item.type.name} />
            ))}
          </TypeContainer>
          {/* Som do Pokemon */}
          <br />
          <PokemonCry src={pokemon.cries.latest} />

          {/*Tabela de stats*/}
          <PokemonStats stats={pokemon.stats} />
        </Box>
      </Paper>
    </Container>
  );
};
