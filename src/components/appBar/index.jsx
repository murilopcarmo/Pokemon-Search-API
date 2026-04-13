import { styled, alpha } from "@mui/material/styles";
import { AppBar as MuiAppBar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TemporaryDrawer from "../appDrawer";
import { useNavigate } from "@tanstack/react-router";
import { Autocomplete } from "@mui/material";
import { allPokemonNames } from "../../services/pokemonServices";
import { useState } from "react";

const formatName = (name) => {
    if (!name) return "";
    return name.replace(/_/g, " ") // Substitui todos os underscores por espaço
       .replace(/-/g, " ") // Substitui todos os hífens por espaço
       .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function AppBar() {
  const {data: pokemonNames, isLoading} = allPokemonNames();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="fixed">
        <Toolbar>
          <TemporaryDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PokéPedia
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              options={pokemonNames || []}
              getOptionLabel={(option) => formatName(option.name)}
              filterOptions={(options, state)=>{
                const input = state.inputValue.toLowerCase();
                if (!input) return [];
                return options.filter((option) =>
                  option.name.toLowerCase().startsWith(input)
                );
              }}
              
              openOnFocus={false}
              open={inputValue.length > 0}
              forcePopupIcon={false}
              onInputChange={(event, newInputValue) =>{
                setInputValue(newInputValue);
              }}
              onChange={(event, value) => {
                if (value) { navigate({
                    to: "/pokemonDetails/$name",
                    params: { name: value.name },
                  });
                }
              }}
              sx={{ width: { xs: "100%", md: 300 } }}
              renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                <StyledInputBase
                  {...rest}
                  {...InputProps}
                  placeholder="Quick Search Pokémon…"
                  inputProps={{ ...params.inputProps, "aria-label": "search" }}
                />
              )
              }}
            />
              
          </Search>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
