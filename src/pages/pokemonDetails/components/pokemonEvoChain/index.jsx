import { Box, Typography, Chip, Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { formatName } from "../../hooks";

export const EvolutionChain = ({ evolutionChain, name }) => {
  const navigate = useNavigate();
  const handleEvolutionClick = (name) => {
    navigate({
      to: "/pokemonDetails/$name",
      params: { name }, // Passa o nome do Pokémon como parâmetro para a rota de detalhes
    });
  };
  // Mapeia os tipos de Pokémon para seus nomes correspondentes
  const TYPE_MAP = {
  1: "normal", 2: "fighting", 3: "flying", 4: "poison", 5: "ground",
  6: "rock", 7: "bug", 8: "ghost", 9: "steel", 10: "fire",
  11: "water", 12: "grass", 13: "electric", 14: "psychic", 15: "ice",
  16: "dragon", 17: "dark", 18: "fairy"
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Evolution Chain
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {evolutionChain.length > 0 ? (
          evolutionChain.map((evolution, index) => {
            return (
              <React.Fragment key={index}>
                {evolution.evolve.length > 0 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, mt: 1 }}
                  >
                    {evolution.evolve.filter((value, index, self) =>
                    index === self.findIndex((v) => (
                      v.trigger === value.trigger && v.time_of_day === value.time_of_day)))
                    .map((evo, evoIndex) => {
                      const conditions = [
                        evo.trigger ? `Trigger: ${formatName(evo.trigger)}` : null,
                        evo.min_level ? `Min Level: ${evo.min_level}` : null,
                        evo.time_of_day ? `Time of Day: ${formatName(evo.time_of_day)}` : null,
                        evo.turn_upside_down ? "Turn Upside Down" : null,
                        evo.party_type_id ? `With a ${formatName(TYPE_MAP[evo.party_type_id])} type in party.` : null,
                        evo.party_species_id === 223 ? `With Remoraid in party.` : null,
                        evo.trade_species_id === 588 ? `Trade for Karrablast` 
                        : evo.trade_species_id === 616 ? `Trade for Shelmet` : null,
                        evo.relative_physical_stats === 1 ? "Level up with Attack > Defense"
                        : evo.relative_physical_stats === -1 ? "Level up with Attack < Defense"
                        : evo.relative_physical_stats === 0 ? "Level up with Attack = Defense" : null,
                        evo.gender_id === 1 ? "Female" 
                        : evo.gender_id === 2 ? "Male" : null,
                        evo.needs_overworld_rain
                          ? "Needs Overworld Rain"
                          : null,
                        evo.min_affection
                          ? `Min Affection: ${evo.min_affection}`
                          : null,
                        evo.min_beauty ? `Min Beauty: ${evo.min_beauty}` : null,
                        evo.min_happiness
                          ? `Min Happiness: ${evo.min_happiness}`
                          : null,
                        evo.item ? `Item: ${formatName(evo.item)}` : null,
                        evo.heldItem ? `Held Item: ${formatName(evo.heldItem)}` : null,
                        evo.location
                          ? evo.location === ("eterna-forest"||"pinwheel-forest"||"kalos-route-20") ?
                          `Location: Near Moss Rock`
                          : evo.location === ("sinnoh-route-217"||"twist-mountain"||"frost-cavern") ?
                          `Location: Near Ice Rock`
                          : `Location: ${formatName(evo.location)}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(", "); // Filtra condições nulas e junta em uma strings
                      return (
                        < React.Fragment key={evoIndex}>
                        <Typography key={evoIndex} variant="caption" color="textSecondary">
                         ({conditions})
                          {evo.heldItemSprite && (
                            <img
                              alt={formatName(evo.heldItem)}
                              src={evo.heldItemSprite}
                              style={{ width: 20, height: 20, marginLeft: 4 }}
                            />
                          )}
                         {evo.itemSprite && (
                          <img
                            alt={formatName(evo.item)}
                            src={evo.itemSprite}
                            style={{ width: 20, height: 20, marginLeft: 4 }}
                          />
                        )}
                        </Typography>
                        </React.Fragment>
                      
                      );
                    })}
                  </Box>
                )}

                {evolution.evolutionForms.length > 0 ? (
                  evolution.evolutionForms.map((form, formIndex) => {
                   
                    const isCurrentPokemon = form.name === name;
            
                    return (
                      <React.Fragment key={formIndex}>
                        <Chip
                          avatar={
                            <Avatar
                              alt={formatName(form.name)}
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png`}
                            />
                          }
                          label={formatName(form.name)}
                          onClick={() => handleEvolutionClick(form.name)}
                          color={isCurrentPokemon ? "primary" : "default"}
                          variant={isCurrentPokemon ? "filled" : "outlined"}
                          sx={{ cursor: "pointer" }}
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Typography variant="body2">No evolution forms available.</Typography>
                )}
                
                {evolution.extraForms.length > 0 ? (
                  evolution.extraForms.map((form, formIndex) => {
                   
                    const isCurrentPokemon = form.name === name;
            
                    return (
                      <React.Fragment key={formIndex}>
                        <Chip
                          avatar={
                            <Avatar
                              alt={formatName(form.name)}
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png`}
                            />
                          }
                          label={formatName(form.name)}
                          onClick={() => handleEvolutionClick(form.name)}
                          color={isCurrentPokemon ? "primary" : "default"}
                          variant={isCurrentPokemon ? "filled" : "outlined"}
                          sx={{ cursor: "pointer" }}
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  null
                )}
              </React.Fragment>
            );
            
          })
            ) : (
          <Typography variant="body2">No evolution data available.</Typography>

          
        )}
      </Box>
    </Box>
  );
};
