import { StatsTable, Td, Th} from "./styles";
import { LinearProgress } from "@mui/material";

export const PokemonStats = ({ stats }) => {
  return (
    <StatsTable>
      <thead>
        <tr>
          <th>Stat</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(stats) &&
          stats.map((item, index) => (
            <tr key={index}>
              <Th><div>{item.stat.name.toUpperCase().replace(/^SP(?!(EED))\w+/, "SP.").replace(/-/g, " ")}:</div><div>{item.base_stat}</div></Th>
              <Td><LinearProgress variant="determinate" sx={{height: "15px"}} color={item.stat.name === "hp" ? "hpColor" : item.stat.name === "attack" ? "attackColor" : item.stat.name === "defense" ? "defenseColor" : item.stat.name === "special-attack" ? "specialAttackColor" : item.stat.name === "special-defense" ? "specialDefenseColor" : item.stat.name === "speed" ? "speedColor" : "primary"} value={(100* item.base_stat)/255} /></Td>
            </tr>
          ))}
      </tbody>
    </StatsTable>
  );
};
