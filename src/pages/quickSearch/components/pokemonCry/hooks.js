export const usePokemonCry = ({src}) => {
  const play = () => {
    const pokemonCry = new Audio(src);
    pokemonCry.currentTime = 0;
    pokemonCry.play();
  };
  return {play};
};
