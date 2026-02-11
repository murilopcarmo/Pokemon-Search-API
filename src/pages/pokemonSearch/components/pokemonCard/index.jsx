import { CardActionArea } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PokemonCardContainer, PokemonSprite } from "./styles";


export const PokemonCard = ({ name, id }) => {
  const fontSize = name.length > 10 ? "0.9rem" : "1.2rem"; // Ajusta o tamanho da fonte com base no comprimento do nome do Pokémon para garantir que ele se encaixe bem no card
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate ({
        to: '/pokemonDetails/$name',
        params: { name }, // Passa o nome do Pokémon como parâmetro para a rota de detalhes
      });
    }
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1); // Deixa a primeira letra do nome do Pokémon em maiúscula para uma melhor apresentação no card
  return (
    <PokemonCardContainer>
      <CardActionArea onClick={() => handleCardClick()}>
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
            {`#${id}`}
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
            {nameCapitalized}
          </Typography>
        </CardContent>
      </CardActionArea>
    </PokemonCardContainer>
  );
};
