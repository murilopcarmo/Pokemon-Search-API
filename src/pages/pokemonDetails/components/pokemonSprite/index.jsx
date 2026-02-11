export const PokemonSprite = ({ id, alt }) => {
    return (<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={alt} />);
}