import { usePokemonCry } from "./hooks";
import { CryButton } from "./styles";

export const PokemonCry = ({ src }) => {
    const playCry = usePokemonCry(src);
    return (
        <CryButton onClick={playCry} >▶</CryButton>
    );
}