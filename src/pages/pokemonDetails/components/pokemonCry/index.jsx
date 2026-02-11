import { Typography } from "@mui/material";
import { usePokemonCry } from "./hooks";
import { Box } from "./styles";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from "@mui/material/IconButton";

export const PokemonCry = ({ src }) => {
  const {play} = usePokemonCry({src});
  return (
    <Box>
      <IconButton size="small" onClick={play}><PlayCircleIcon /></IconButton>
      <Typography>Cry</Typography>
    </Box>
  );
};
