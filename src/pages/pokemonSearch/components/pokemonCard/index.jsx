import { CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PokemonCardContainer, PokemonSprite } from "./styles";

export const PokemonCard = ({ name, id }) => {
  const fontSize = name.length > 10 ? "0.9rem" : "1.2rem"; // Adjust font size based on name length
  name = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter of the name
  return (
    <PokemonCardContainer>
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
      <CardActions></CardActions>
    </PokemonCardContainer>
  );
};
