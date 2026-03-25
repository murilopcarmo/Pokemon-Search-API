import { useQuery } from "@tanstack/react-query";
import { findItem } from "../../services/pokemonServices";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Container } from "@mui/material";
import { formatName } from "../pokemonDetails/hooks";

export const ItemDetails = () => {
    const { name } = useParams({ from: "/_layout/itemDetails/$name" }); // Obtém o nome do item a partir dos parâmetros da rota
    
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
            <h1>{formatName(item.name)}</h1>
            <p>Cost: {item.cost}</p>
            <p>Effect: {item.pokemon_v2_itemeffecttexts[0]?.short_effect}</p>
            <p>Flavor Text: {item.pokemon_v2_itemflavortexts[0]?.flavor_text}</p>
            <img src={item.pokemon_v2_itemsprites[0]?.sprites.default ? item.pokemon_v2_itemsprites[0]?.sprites.default : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/unknown.png"} alt={item.name} />
            {item.pokemon_v2_pokemonevolutions.length > 0 && (
                item.pokemon_v2_pokemonevolutions.map((evolution, index) => (
                    <p key={index}>Evolves into: {formatName(evolution.pokemon_v2_pokemonspecy.name)}</p>
                ))
                
            )}
        </Container>
    );
};
