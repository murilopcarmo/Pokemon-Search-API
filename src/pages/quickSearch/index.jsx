import { useState } from "react";
import { usePokeSearch } from "./hook";
import { PokemonType } from "./components/pokemonType";
import { PokemonSprite } from "./components/pokemonSprite";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";
import { Container, SearchButton } from "./styles";
import { Skeleton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export const QuickSearch = () => {
  const [input, setInput] = useState("");
  const { pokemon, loading, error, fetchPokemon } = usePokeSearch();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const inputSearch = () => {
    fetchPokemon(input);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      inputSearch();
    }
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
        onKeyDown={handleKeyDown}
        required
      />
      <div id="bottom-box">
        <SearchButton
          variant="contained"
          color="secondary"
          onClick={inputSearch}
          disabled={loading}
        >
          <Typography variant="buttons">
            {loading ? "Buscando..." : "Buscar"}
          </Typography>
        </SearchButton>
      </div>
      <br />
      <div id="output">
        {/*Container de dados*/}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {pokemon && (
          <div className="pokemon-info">
            {/*nome*/}
            {loading ? (<Skeleton variant="text" width={100} height={30} />) :
            <Typography variant="h5">{pokemon.name}</Typography>}
            <br />
            {/*Sprite*/}
            {loading ? (<Skeleton variant="rectangular" width={96} height={96} />) :
            pokemon.image && (
              <PokemonSprite sprite={pokemon.image} alt={pokemon.name} />
            )}
            <br />
            {/*Tipos*/}
            <Container>
              {loading ? (<Skeleton variant="rectangular" width={150} height={30} />) :
              pokemon.type &&
                pokemon.type.map((item, index) => (
                  <PokemonType key={index} types={item.type.name} />
                ))}
            </Container>
            {/* Som do Pokemon */}
            <br />
            {loading ? (<Skeleton variant="rectangular" width={200} height={30} />) :
            pokemon.cry && <PokemonCry src={pokemon.cry} />}

            {/*Tabela de stats*/}
            {loading ? (<Skeleton variant="rectangular" width={300} height={150} />) :
            pokemon.stats && pokemon.stats.length > 1 && (
              <PokemonStats stats={pokemon.stats} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
