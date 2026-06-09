import { createTheme } from "@mui/material";

export const pokedexTheme = {
  primary: {
    50: "#FEF2F1",
    100: "#FEE2E1",
    200: "#F9C5C1",
    300: "#F49B94",
    400: "#EF7267",
    500: "#EB4333", // Cor Base
    600: "#D13A2C",
    700: "#A62E23",
    800: "#7D231A",
    900: "#4A1510",
  },

  // Escala Neutra (Texto, Fundos e Bordas)
  gray: {
    50: "#F8FAFC", // Fundo do site
    100: "#F1F5F9", // Fundo de cards/inputs
    200: "#E2E8F0", // Bordas
    300: "#CBD5E1", // Texto desativado
    400: "#94A3B8", // Placeholders
    500: "#64748B", // Texto secundário (ex: #ID do pokemon)
    600: "#475569",
    700: "#334155", // Texto de corpo (Lidável)
    800: "#1E293B",
    900: "#0F172A", // Títulos e nomes
  },

  // Cores de Feedback (Status)
  status: {
    success: {
      light: "#DCFCE7",
      main: "#22C55E",
      dark: "#14532D",
    },
    info: {
      light: "#DBEAFE",
      main: "#3B82F6",
      dark: "#1E3A8A",
    },
    warning: {
      light: "#FEF3C7",
      main: "#F59E0B",
      dark: "#78350F",
    },
    error: {
      light: "#FEE2E2",
      main: "#EF4444",
      dark: "#7F1D1D",
    },
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: pokedexTheme.primary[500],
      light: pokedexTheme.primary[400],
      dark: pokedexTheme.primary[700],
    },
    secondary: {
      main: "#a43024",
    },
    // Cores para os status dos Pokémon
    hpColor: { main: '#00b894' },
    attackColor: { main: '#d63031' },
    defenseColor: { main: '#0984e3' },
    specialAttackColor: { main: '#e17055' },
    specialDefenseColor: { main: '#6c5ce7' },
    speedColor: { main: '#e84393' },
    // Cores para os tipos dos Pokémon
    normal: { main: "#A8A77A" },
    fire: { main: "#EE8130" },
    water: { main: "#6390F0" },
    electric: { main: "#F7D02C" },
    grass: { main: "#7AC74C" },
    ice: { main: "#96D9D6" },
    fighting: { main: "#C22E28" },
    poison: { main: "#A33EA1" },
    ground: { main: "#E2BF65" },
    flying: { main: "#A98FF3" },
    psychic: { main: "#F95587" },
    bug: { main: "#A6B91A" },
    rock: { main: "#B6A136" },
    ghost: { main: "#735797" },
    dragon: { main: "#6F35FC" },
    dark: { main: "#705746" },
    steel: { main: "#B7B7CE" },
    fairy: { main: "#D685AD" },
    
    divider: pokedexTheme.gray[200],
  },
  typography: {
    buttons: {
      textTransform: "none",
      fontWeight: "bold",
    },
    id: {
      color: pokedexTheme.gray[500],
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      padding: 0,
      margin: 0,
    },
    h5: {
      color: pokedexTheme.gray[900],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
