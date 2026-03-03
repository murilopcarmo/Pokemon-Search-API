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
          height: "100vh",
        }}
      >
        <Typography>
          {error?.message ||
            "An error occurred while fetching the Pokémon data."}
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
    <Container id="pokemon-details-container">{/* Container principal para os detalhes do Pokémon */}
      {/* Paper para estilizar o conteúdo dos detalhes do Pokémon */}
      <Paper id="pokemon-details" sx={{padding: 1}}>
        {/*Barra de navegação para o próximo Pokémon*/}
        <PokemonNextBar id={pokemon.id} />

        <Box className="pokemon-info" sx={{paddingTop: 2}}>
          <Box className="pokemon-text" sx={{display: "flex", width: "100%", justifyContent: "space-between"}}>
            <Box sx={{marginRight: "20px", alignItems: "center", display: "flex", flexDirection: "column"}}>
            {/*Nome*/}
            <Typography variant="h5">{formatName(pokemon.name)} #{pokemon.id}</Typography>
            <br />
            {/*Descrição*/}
            <Typography variant="body1">{pokemon.description}</Typography>
            <br />
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            {/*Tipos*/}
          <TypeContainer>
            {pokemon.types.map((item, index) => (
              <PokemonType key={index} types={item.type.name} />
            ))}
          </TypeContainer>
            {/*Sprite*/}
            <PokemonImg id={pokemon.id} alt={formatName(pokemon.name)} />
            </Box>
          </Box>
          
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
