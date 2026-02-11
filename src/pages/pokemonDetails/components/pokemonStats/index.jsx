import { StatsTable, Td } from "./styles";

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
              <Td>{item.stat.name.toUpperCase()}</Td>
              <Td>{item.base_stat}</Td>
            </tr>
          ))}
      </tbody>
    </StatsTable>
  );
};
