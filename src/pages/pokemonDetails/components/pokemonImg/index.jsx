import { Box, Paper, Tab, Tabs, Skeleton } from "@mui/material";
import { useState } from "react";



export const PokemonImg = ({ id, alt }) => {
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue);
        setLoading(false);
    };

    return (
            <Box>
            <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center",
                 padding: 2, width: "fit-content" }}>
            <Tabs  onChange={onTabChange} value={tabValue} aria-label="pokemon image tabs"
             sx={{ marginBottom: 2 }}>
                <Tab label="Sprite" />
                <Tab label="Artwork" />
            </Tabs>

            {!loading &&
            <Skeleton variant="rectangular" width={150} height={150} />
            }

            <img crossOrigin="anonymous" src={tabValue === 0 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
             alt={`${alt} ${tabValue === 0 ? "sprite" : "artwork"}`} width={150} onLoad={()=>setLoading(true)}
              style={{display: loading ? "block" : "none"}}/>
            
            </Paper>
            </Box>
    );
};