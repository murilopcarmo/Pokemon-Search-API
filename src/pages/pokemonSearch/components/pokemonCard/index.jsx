import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PokemonCardContainer, PokemonSprite } from "./styles";
import { useCallback } from "react";

export const PokemonCard = ({ name, id }) => {
  const fontSize = name.length > 10 ? "0.9rem" : "1.2rem"; // Ajusta o tamanho da fonte com base no comprimento do nome do Pokémon para garantir que ele se encaixe bem no card
  const navigate = useNavigate();

  const handleCardClick = useCallback(name => { //Navega para a página de detalhes do Pokémon ao clicar no card e usa callback para memorizar a função e evitar re-renderizações desnecessárias
    navigate({ to: '/pokemonDetails/$pName', params: { pName: name.toLowerCase() } });
  }, [navigate]);
  name = name.charAt(0).toUpperCase() + name.slice(1); // Deixa a primeira letra do nome do Pokémon em maiúscula para uma melhor apresentação no card
  return (
    <PokemonCardContainer>
      <CardActionArea onClick={() => handleCardClick(name)}>
      <PokemonSprite
        component="img"
        alt={name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        onError={(e) => {
          e.target.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }}
      />
      <CardContent>
        <Typography variant="id" component="div">
          {`#${id.padStart(3, "0")}`}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: "center",
            mt: -1,
            fontSize: fontSize,
            lineHeight: "1.2rem",
          }}
        >
          {name}
        </Typography>
      </CardContent>
      </CardActionArea>
    </PokemonCardContainer>
  );
};
