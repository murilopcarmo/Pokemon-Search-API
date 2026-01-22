import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ThemeProvider } from '@mui/material'
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
    <ThemeProvider theme={theme}><AppRouter /></ThemeProvider>
    /*<div id="app-container">
      <div>
        <img
          id="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="pokemon-logo"
        />
      </div>
      <main>
        <PokeSearch />
      </main>
    </div>*/

  );
};
