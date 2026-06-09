import { Box, Container, Paper, Typography } from "@mui/material";

export const About = () => {
  return (
    <Container id="about">
      <Paper elevation={3} sx={{ borderRadius: 5, overflow: "hidden", mb: 4 }}>
        <Box bgcolor="primary.light" width="100%" p={4} textAlign="center">
          <Typography variant="h4" component="h1">
            About the PokéPedia Project
          </Typography>
          <Typography variant="subtitle1" component="p" fontStyle={"italic"}>
            Learn about the history and goals behind PokéPedia!
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" p={4}>
            PokéPedia was created with the goal of being a data source about the Pokémon universe,
            using the public PokeAPI to provide detailed information about species, abilities, evolutions, types and much more.
          </Typography> 
          <Typography variant="body1" component="p" p={4}>
            The project was developed as part of a technical challenge to demonstrate skills in React, Material-UI and integration with external APIs.
            It is completely free and open source, allowing anyone to contribute or use the information for their own projects.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
