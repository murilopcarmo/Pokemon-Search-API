import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { RouterProvider } from "@tanstack/react-router";
import { theme } from "./theme/index.js";

const router = createRouter({routeTree});


const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
}


export const App = () => {
  return (
    <MUIThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
      <AppRouter />
      </StyledThemeProvider>
    </MUIThemeProvider>
  );
}
