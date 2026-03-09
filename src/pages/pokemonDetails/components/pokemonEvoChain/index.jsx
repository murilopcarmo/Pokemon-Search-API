import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { formatName } from "../../hooks";


export const EvolutionChain = ({ evolutionChain, name }) => {
    const navigate = useNavigate();
    const handleEvolutionClick = (name) => {
        navigate({
            to: '/pokemonDetails/$name',
            params: { name }, // Passa o nome do Pokémon como parâmetro para a rota de detalhes
        });
    };
  return (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
            Evolution Chain
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {evolutionChain.length > 0 ? (
                evolutionChain.map((evolution, index) => (
                    evolution.name !== name && ( // Evita mostrar o Pokémon atual na lista de evoluções
                    <Typography
                        key={index}
                        variant="body2"
                        onClick={() => handleEvolutionClick(evolution.name)}
                        sx={{ cursor: 'pointer' }}
                    >
                        - {formatName(evolution.name)}
                    </Typography>
                    )
                ))
            ) : (
                <Typography variant="body2">No evolution data available.</Typography>
            )}
        </Box>
    </Box>
  );
};
