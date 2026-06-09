import { Box, Container, Typography, Paper } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const Home = () => {
  return (
    <Container id="home">
      <Paper elevation={3} sx={{ borderRadius: 5, overflow: "hidden", mb: 4 }}>
        <Box bgcolor="primary.light" width="100%" p={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Welcome to Poképedia!
          </Typography>
          <Typography variant="subtitle1" component="p" fontStyle={"italic"}>
            Explore the world of Pokémon with us!
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" p={4}>
            Poképedia is an online encyclopedia dedicated to providing detailed
            information about the Pokémon universe. Here, you can find data about
            species, abilities, evolutions, types and much more.
            Whether you are a beginner trainer or a long-time fan.
          </Typography>
          <Typography variant="body1" component="p" p={4}>
            You can access the menu through the pokeball icon in the top-left corner 
            to explore different sections of the site or through the quick links below:
          </Typography>
          <Container
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}
          >
            {[
              {to: "/pokemonSearch", label: "Search Pokémon"},
              {to: "/about", label: "About the Project"},
            ].map((link) => (
              <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
                <Paper elevation={3} sx={{padding: 1}}>
                <Typography variant="h6" component="p" color="primary.main">
                  {link.label}
                </Typography>
              </Paper>
              </Link>
            ))}
          </Container>
        </Box>
      </Paper>
    </Container>
  );
};
