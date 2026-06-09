import { useQuery } from "@tanstack/react-query";
import { findItem } from "../../services/pokemonServices";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Container, Typography } from "@mui/material";
import { formatName } from "../pokemonDetails/hooks";

export const ItemDetails = () => {
    const { name } = useParams({ from: "/_layout/itemDetails/$name" }); // Obtém o nome do item a partir dos parâmetros da rota
    const navigate = useNavigate();
    const handlePokemonClick = (name) => {
    navigate({
      to: "/pokemonDetails/$name",
      params: { name }, // Passa o nome do Pokémon como parâmetro para a rota de detalhes
    });
  };
  
    const {
      data: item,
        isLoading,
        error,
        isError,
    } = useQuery({
      queryKey: ["itemDetails", name],
        queryFn: () => findItem(name), // Busca os dados completos do item usando o nome como parâmetro
        retry: false, // Desativa tentativas automáticas de refetch em caso de erro
        refetchOnWindowFocus: false, // Desativa refetch ao focar a janela
    });

    if (isLoading)
        return (
            <Container>
                <p>Loading...</p>
            </Container>
        );

    if (isError) {
        return (
            <Container>
                <p>Error: {error.message}</p>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4">{formatName(item.name)} <img src={item.sprite[0]?.sprites.default ? item.sprite[0]?.sprites.default : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/unknown.png"} alt={item.name} /></Typography>
            <Typography>Cost: {item.cost ? item.cost : "Cost not available on PokeAPI."}</Typography>
            <Typography>Description: {item.description[0]?.flavor_text ? item.description[0]?.flavor_text : "Description not available on PokeAPI."}</Typography>
            <Typography>Effect: {item.effect[0]?.short_effect ? item.effect[0]?.short_effect : "No effect available on PokeAPI."}</Typography>
            
            {item.evolutions.length > 0 && (
                item.evolutions.map((evolution, index) => (
                    <Typography key={index}>Evolves into:<a href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePokemonClick(evolution.pokemon.name);
                    }}>{formatName(evolution.pokemon.name)}</a></Typography>
                ))
                
            )}
        </Container>
    );
};
