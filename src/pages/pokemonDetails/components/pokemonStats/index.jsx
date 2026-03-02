import { StatsTable, Td, Th, StatBar} from "./styles";

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
              <Td><StatBar width={item.base_stat} color={item.stat.name} /></Td>
            </tr>
          ))}
      </tbody>
    </StatsTable>
  );
};
