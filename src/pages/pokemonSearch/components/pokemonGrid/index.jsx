import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "./hooks";
import { Box, CircularProgress, Container, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PokemonCard } from "../pokemonCard";

export const PokemonGrid = () => {
  const [input, setInput] = useState(""); // State to hold the search input
  const [pokemonList, setPokemonList] = useState([]); // State to hold the list of Pokémon
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [limit, setLimit] = useState(30); // State to manage the limit of displayed Pokémon

  const debouncedSearch = useDebounce(input, 1000); // Debounce delay of 1s

  const isSearching =
    input.length > 0 && input !== debouncedSearch && input !== "todos"; // Determine if a search is in progress

  useEffect(() => {
    // Fetch Pokémon data from the API
    async function fetchPokemonList() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1025",
        );
        const data = await response.json();
        const dataFormatted = data.results.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return {
            id: id,
            name: pokemon.name,
          };
        });
        setPokemonList(dataFormatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    }
    fetchPokemonList();
  }, []);

  const filteredPokemonList = useMemo(() => {
    // Memoized filtered list based on debounced search
    if (!debouncedSearch) {
      //empty search
      return [];
    }

    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(debouncedSearch.toLowerCase()),
    );
  }, [pokemonList, debouncedSearch]);

  const handleChange = (event) => {
    setInput(event.target.value);
    setLimit(30); // Reset limit on input change
  };

  const renderContent = () => {
    // Function to render content based on search state
    let listToRender = [];

    if (input === "todos") {
      // Show all Pokémon
      listToRender = pokemonList;
    } else if (input.length > 0 && filteredPokemonList.length > 0) {
      // Show filtered Pokémon
      listToRender = filteredPokemonList;
    } else if (input.length > 0 && filteredPokemonList.length === 0) {
      // No Pokémon found
      return (
        <Typography variant="h6" sx={{ m: 2 }}>
          Nenhum Pokémon encontrado.
        </Typography>
      );
    } else {
      return null; // No input, render nothing
    }
    const cardsToShow = listToRender.slice(0, limit).map((pokemon) => ( //
      <Grid size={{ xs: 12, md: 2 }} key={pokemon.id}>
        <PokemonCard name={pokemon.name} id={pokemon.id} />
      </Grid>
    ));
    return (
      <>
        {cardsToShow}
        {limit < listToRender.length && ( // Show "Load More" button if there are more Pokémon to load
          <Grid size={{ xs: 12 }} sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="text" onClick={() => setLimit(limit + 30)}>
              Carregar mais
            </Button>
          </Grid>
        )}
      </>
    );
  };
  // Render loading state or Pokémon grid
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  // Render the grid of Pokémon cards
  return (
    <Container>
      <div id="text">Qual Pokémon busca?</div>
      <TextField
        id="searchPokemon"
        size="small"
        variant="outlined"
        value={input}
        onChange={handleChange}
        placeholder="'todos' para completa"
        required
      />
      <div id="bottom-box"></div>
      <Grid container spacing={2}>
        {isSearching ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          renderContent()
        )}
      </Grid>
    </Container>
  );
};
