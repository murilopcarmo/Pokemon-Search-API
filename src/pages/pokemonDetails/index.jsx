import { useParams } from "@tanstack/react-router";
import { PokemonType } from "./components/pokemonType";
import { PokemonSprite } from "./components/pokemonSprite";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { Container } from "./styles";
import { Typography } from "@mui/material";
import { findPokemonFullData } from "../../services/pokemonServices";
import { useQuery } from "@tanstack/react-query";


export const PokemonDetails = () => {
  const { name } = useParams({from: '/_layout/pokemonDetails/$name'}); // Obtém o nome do Pokémon a partir dos parâmetros da rota
  const {
    data: pokemon,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetails", name],
    queryFn: () => findPokemonFullData(name), // Busca os dados completos do Pokémon usando o nome como parâmetro
  });
if (isLoading) return <Typography>Buscando dados de {name}...</Typography>;
if (!pokemon || !pokemon.types || !pokemon.stats) {
    return <Typography>Buscando dados de {name}...</Typography>; 
  }


  const nameCapitalized = pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : name;
  return (
      <div id="pokemon-details">
        {/*Container de dados*/}
          <div className="pokemon-info">
            {/*nome*/}
            <Typography variant="h5">{nameCapitalized}</Typography>
            <br />
            {/*Sprite*/}
            <PokemonSprite id={pokemon.id} alt={nameCapitalized} />
            <br />
            {/*Tipos*/}
            <Container>
                {pokemon.types.map((item, index) => (
                  <PokemonType key={index} types={item.type.name} />
                ))}
            </Container>
            {/* Som do Pokemon */}
            <br />
            <PokemonCry src={pokemon.cries.latest} />

            {/*Tabela de stats*/}
            <PokemonStats stats={pokemon.stats} />
          </div>

      </div>
  );
};
