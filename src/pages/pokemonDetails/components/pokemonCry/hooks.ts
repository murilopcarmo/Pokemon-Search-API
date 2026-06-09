export const usePokemonCry = ({src}: { src: string }) => {
  const play = () => {
    const pokemonCry = new Audio(src);
    pokemonCry.currentTime = 0;
    pokemonCry.play();
  };
  return {play};
};
