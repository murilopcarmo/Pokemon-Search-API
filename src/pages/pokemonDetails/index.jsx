import { useLoaderData } from "@tanstack/react-router";
import { PokemonType } from "./components/pokemonType";
import { PokemonSprite } from "./components/pokemonSprite";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { Container } from "./styles";
import { Typography } from "@mui/material";


export const PokemonDetails = () => {
  const pokemon = useLoaderData({from: '/_layout/pokemonDetails/$pName'}); // Carrega os dados do Pokémon usando o nome como parâmetro
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  return (
      <div id="pokemon-details">
        {/*Container de dados*/}
          <div className="pokemon-info">
            {/*nome*/}
            <Typography variant="h5">{name}</Typography>
            <br />
            {/*Sprite*/}
            <PokemonSprite id={pokemon.id} alt={name} />
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
