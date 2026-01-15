export const usePokemonCry = (src) => {
  const playCry = (src) => {
    const pokemonCry = new Audio(src);
    pokemonCry.currentTime = 0;
    pokemonCry.play();
  };
  return () => playCry(src);
};
