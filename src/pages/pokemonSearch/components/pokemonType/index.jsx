import { Span } from "./styles";

export const PokemonType = ({ types }) => {
  return <Span color={types}>{types.toUpperCase()}</Span>;
};
