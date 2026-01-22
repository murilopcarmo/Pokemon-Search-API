import { createTheme } from '@mui/material'

const pokedexTheme = {
  primary: {
    50: '#FEF2F1',
    100: '#FEE2E1',
    200: '#F9C5C1',
    300: '#F49B94',
    400: '#EF7267',
    500: '#EB4333', // Cor Base
    600: '#D13A2C',
    700: '#A62E23',
    800: '#7D231A',
    900: '#4A1510',
  },
  
  // Escala Neutra (Texto, Fundos e Bordas)
  gray: {
    50: '#F8FAFC',  // Fundo do site
    100: '#F1F5F9', // Fundo de cards/inputs
    200: '#E2E8F0', // Bordas
    300: '#CBD5E1', // Texto desativado
    400: '#94A3B8', // Placeholders
    500: '#64748B', // Texto secundário (ex: #ID do pokemon)
    600: '#475569',
    700: '#334155', // Texto de corpo (Lidável)
    800: '#1E293B',
    900: '#0F172A', // Títulos e nomes
  },

  // Cores de Feedback (Status)
  status: {
    success: {
      light: '#DCFCE7',
      main: '#22C55E',
      dark: '#14532D',
    },
    info: {
      light: '#DBEAFE',
      main: '#3B82F6',
      dark: '#1E3A8A',
    },
    warning: {
      light: '#FEF3C7',
      main: '#F59E0B',
      dark: '#78350F',
    },
    error: {
      light: '#FEE2E2',
      main: '#EF4444',
      dark: '#7F1D1D',
    }
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
            main: '#a43024',
        },
    },
    typography: {
        buttons: {
            textTransform: 'none',
            fontWeight: 'bold',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                }
            }
        }
    } 
});