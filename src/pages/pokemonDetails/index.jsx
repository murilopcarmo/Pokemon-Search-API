import { useParams } from "@tanstack/react-router";
import { PokemonType } from "./components/pokemonType";
import { PokemonNextBar } from "./components/pokemonNextBar";
import { PokemonImg } from "./components/pokemonImg";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { EvolutionChain } from "./components/pokemonEvoChain";
import { formatName } from "./hooks";
import {
  Typography,
  Container,
  Paper,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { findPokemonFullData } from "../../services/pokemonServices";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const PokemonDetails = () => {
  const { name } = useParams({ from: "/_layout/pokemonDetails/$name" }); // Obtém o nome do Pokémon a partir dos parâmetros da rota
  const navigate = useNavigate();
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
        <Typography>Searching data of "{name}"...</Typography>
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
          height: "fit-content",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography color="error">
            {error?.message ||
              "An error occurred while fetching the Pokémon data."}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate({ to: "/pokemonSearch" })} // Navega de volta para a lista de Pokémon
            sx={{ marginLeft: 2 }}
          >
            Back to Pokémon List
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container id="pokemon-details-container">
      {/* Container principal para os detalhes do Pokémon */}
      {/* Paper para estilizar o conteúdo dos detalhes do Pokémon */}
      <Paper id="pokemon-details" sx={{ padding: 1 }}>
        {/*Barra de navegação para o próximo Pokémon*/}
        <PokemonNextBar id={pokemon.id} />

        <Box className="pokemon-info" sx={{ paddingTop: 2 }}>
          <Box
            sx={{
              marginRight: "20px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/*Nome*/}
            <Typography variant="h5">
              {formatName(pokemon.name)} #{pokemon.id}
            </Typography>
          </Box>
          <Box
            className="pokemon-data"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/*Tabela de stats*/}
            <Box>
              <PokemonStats stats={pokemon.stats} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/*Sprite*/}
              <PokemonImg id={pokemon.id} alt={formatName(pokemon.name)} />
              {/*Tipos*/}
              <Box
                component="fieldset"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  width: "200px", // Tamanho fixo que você solicitou
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Centraliza o conteúdo horizontalmente
                }}
              >
                <Typography
                  component="legend"
                  variant="caption"
                  sx={{
                    px: 1, // Espaçamento nas laterais do texto
                    color: "text.secondary",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Types
                </Typography>
                <Stack direction="row" spacing={1}>
                  {pokemon.types.map((item, index) => (
                    <PokemonType key={index} types={item.type.name} />
                  ))}
                </Stack>
              </Box>
              {/* Som do Pokemon */}
              <br />
              <PokemonCry src={pokemon.cries.latest} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginRight: "20px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <br />
          {/*Descrição*/}
          <Typography variant="body1">{pokemon.description}</Typography>
          <Typography variant="body2">
            Height: {pokemon.height / 10} m | Weight: {pokemon.weight / 10} kg
          </Typography>
          <Typography variant="body2">Species: {pokemon.species}</Typography>
          <br />
          {/*Evolução*/}
          <EvolutionChain
            evolutionChain={pokemon.evolutionTree}
            name={pokemon.name}
          />
          <br />
        </Box>
      </Paper>
    </Container>
  );
};
