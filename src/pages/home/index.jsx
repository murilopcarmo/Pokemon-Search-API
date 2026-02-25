import { Box, Container, Typography, Paper } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const Home = () => {
  return (
    <Container id="home">
      <Paper elevation={3} sx={{ borderRadius: 5, overflow: "hidden", mb: 4 }}>
        <Box bgcolor="primary.light" width="100%" p={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Bem Vindo ao PokéPedia
          </Typography>
          <Typography variant="subtitle1" component="p" fontStyle={"italic"}>
            Explore o mundo dos Pokémon e descubra informações incríveis!
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" p={4}>
            Poképedia é uma enciclopédia online dedicada a fornecer informações
            detalhadas sobre o universo dos Pokémon. Aqui, você pode encontrar
            dados sobre espécies, habilidades, evoluções, tipos e muito mais.
            Seja você um treinador iniciante ou um fã de longa data.
          </Typography>
          <Typography variant="body1" component="p" p={4}>
            Você pode acessar o menu através do ícone de pokebola no canto
            superior esquerdo para explorar as diferentes seções do site ou
            através dos links rápidos abaixo:
          </Typography>
          <Container
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}
          >
            {[
              {to: "/pokemonSearch", label: "Pesquisar Pokémon"},
              {to: "/about", label: "Sobre o Projeto"},
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
