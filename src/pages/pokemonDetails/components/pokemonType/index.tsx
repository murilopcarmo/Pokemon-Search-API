import { Chip } from "@mui/material";

export const PokemonType = ({ types }: { types: string }) => {
  return <Chip label={types.toUpperCase()} sx={{minWidth: 100, minHeight: 30, bgcolor: `${types}.main`, color: "white"}}/>;
};
