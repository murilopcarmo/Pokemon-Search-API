import { useState } from "react";
import { PokemonType } from "./components/pokemonType";
import { PokemonSprite } from "./components/pokemonSprite";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { Container, SearchButton } from "./styles";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export const QuickSearch = () => {
  const [pokemon, setPokemon] = useState({
    id: "",
    name: "",
    image: "",
    type: [],
    stats: [],
    cry: "",
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const pokemonSearch = async () => {
    const searchInput = input.toLowerCase();
    if (!searchInput) {
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`,
      );
      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }
      const data = await response.json();
      setPokemon({
        id: data.id,
        name:
          data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
        image: data.sprites.front_default,
        type: data.types,
        stats: data.stats,
        cry: data.cries.latest,
      });
      setError("");
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setPokemon({
        id: "",
        name: "",
        image: "",
        type: "",
        stats: [],
        cry: "",
      });
      setError("Não encontrado.");
    }
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div id="pokemon">
      <div id="text">Qual Pokémon busca?</div>
      <TextField
        id="searchPokemon"
        size="small"
        variant="outlined"
        value={input}
        onChange={handleChange}
        required
      />
      <div id="bottom-box">
        <SearchButton
          variant="contained"
          color="secondary"
          onClick={pokemonSearch}
        >
          <Typography variant="buttons">Buscar</Typography>
        </SearchButton>
      </div>
      <br />
      <div id="output">
        {/*Container de dados*/}
        <div className="pokemon-info">
          {/*nome*/}
          <span>{pokemon.name}</span>
          <br />
          {/*Sprite*/}
          {pokemon.image && (
            <PokemonSprite sprite={pokemon.image} alt={pokemon.name} />
          )}
          <br />
          {/*Tipos*/}
          <Container>
            {pokemon.type &&
              pokemon.type.map((item, index) => (
                <PokemonType key={index} types={item.type.name} />
              ))}
          </Container>
          {/* Som do Pokemon */}
          <br />
          {pokemon.cry && <PokemonCry src={pokemon.cry} />}
        </div>
        {/*Tabela de stats*/}
        {pokemon.stats && pokemon.stats.length > 1 && (
          <PokemonStats stats={pokemon.stats} />
        )}

        <span>{error}</span>
      </div>
    </div>
  );
};
