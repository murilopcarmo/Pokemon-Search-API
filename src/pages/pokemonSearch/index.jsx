import React from "react";
import { PokemonType } from "./components/pokemonType";
import { PokemonSprite } from "./components/pokemonSprite";
import { PokemonStats } from "./components/pokemonStats";
import { PokemonCry } from "./components/pokemonCry";

class PokemonSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      name: "",
      image: "",
      type: "",
      stats: [],
      cry: "",
      error: "",
    };
  }
  pokemonSearch = async () => {
    const searchInput = this.state.input.toLowerCase();
    if (!searchInput) {
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`
      );
      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }
      const data = await response.json();
      this.setState({
        name: data.name.toUpperCase(),
        image: data.sprites.front_default,
        type: data.types,
        stats: data.stats,
        cry: data.cries.latest,
        error: "",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      this.setState({
        name: "",
        image: "",
        type: "",
        stats: [],
        cry: "",
        error: "Não encontrado.",
      });
    }
  };
  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };
  playcry = () => {
    const pokecry = new Audio(this.state.cry);
    pokecry.currentTime = 0;
    pokecry.play();
  };
  render() {
    return (
      <div id="pokemon">
        <div id="text">Qual Pokémon busca?</div>
        <input
          id="search"
          type="text"
          placeholder="Ex: Squirtle"
          value={this.state.input}
          onChange={this.handleChange}
          required
        ></input>
        <div id="bottom-box">
          <button id="submit" onClick={this.pokemonSearch}>
            Buscar
          </button>
        </div>
        <br />
        <div id="output">
          {/*Container de dados*/}
          <div className="pokemon-info">
            {/*nome*/}
            <span>{this.state.name}</span>
            <br />
            {/*Sprite*/}
            {this.state.image && (
              <PokemonSprite
                sprite={this.state.image}
                alt={this.state.name}
              />
            )}
            <br />
            {/*Tipos*/}
            {this.state.type &&
              this.state.type.map((item, index) => (
                <PokemonType key={index} types={item.type.name} />
              ))}
            {/* Som do Pokemon */}
            <br />
            {this.state.cry && (
              <PokemonCry src={this.state.cry} />
            )}
            <span>Cry</span>
          </div>
          {/*Tabela de stats*/}
          {this.state.stats && this.state.stats.length > 1 && (
            <PokemonStats stats={this.state.stats} />
          )}
          <span>{this.state.error}</span>
        </div>
      </div>
    );
  }
}
export default PokemonSearch;
