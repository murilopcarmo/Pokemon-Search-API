import { CardActionArea, Icon } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { PokemonCardContainer, PokemonSprite } from "./styles";


export const PokemonCard = ({ name, id, isFavorite, toggleFavorite }) => {
  const formatName = (name) => {
    if (!name) return "";

    return name
      .replace(/-/g, " ") // Substitui todos os hífens por espaço
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
  };
  const fontSize = name.length > 10 ? "0.9rem" : "1.2rem"; // Ajusta o tamanho da fonte com base no comprimento do nome do Pokémon para garantir que ele se encaixe bem no card
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate ({
        to: '/pokemonDetails/$name',
        params: { name }, // Passa o nome do Pokémon como parâmetro para a rota de detalhes
      });
    }

  return (
    <PokemonCardContainer>
      <IconButton aria-label="add to favorites" sx={{ width: 32, height: 32 }} onClick={toggleFavorite}>
        {isFavorite ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
      </IconButton>
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
            {formatName(name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </PokemonCardContainer>
  );
};
