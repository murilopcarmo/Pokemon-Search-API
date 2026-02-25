import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";



export const PokemonImg = ({ id, alt }) => {
    const [tabValue, setTabValue] = useState(0);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
            <Box>
            <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, width: "fit-content" }}>
            <Tabs  onChange={onTabChange} value={tabValue}>
                <Tab label="Sprite" />
                <Tab label="Artwork" />
            </Tabs>

            {tabValue === 0 && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={alt+" sprite"} width={150}/>}
            {tabValue === 1 && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={alt+" full artwork"} width={150} />}

            </Paper>
            </Box>
    );
};