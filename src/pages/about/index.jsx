import { Box, Container, Paper, Typography } from "@mui/material";

export const About = () => {
  return (
    <Container id="about">
      <Paper elevation={3} sx={{ borderRadius: 5, overflow: "hidden", mb: 4 }}>
        <Box bgcolor="primary.light" width="100%" p={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Sobre o Projeto PokéPedia
          </Typography>
          <Typography variant="subtitle1" component="p" fontStyle={"italic"}>
            Conheça a história e os objetivos por trás do PokéPedia!
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" p={4}>
            O PokéPedia foi criado com o objetivo de ser uma fonte de dados sobre o universo dos Pokémon,
            utilizando a API pública PokeAPI para fornecer informações detalhadas sobre espécies, habilidades, evoluções, tipos e muito mais.
          </Typography> 
          <Typography variant="body1" component="p" p={4}>
            O projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em React, Material-UI e integração com APIs externas.
            Ele é totalmente gratuito e de código aberto, permitindo que qualquer pessoa possa contribuir ou utilizar as informações para seus próprios projetos.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
