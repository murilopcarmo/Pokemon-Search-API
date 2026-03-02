import styled from "styled-components";

export const StatsTable = styled.table`
  flex: 1;
  border-collapse: separate;
  border-spacing: 3px 3px;
`;

export const Td = styled.td`
  width: 255px;
  border: 1px solid black;
`;

export const Th = styled.th`
  width: 150px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

export const StatBar = styled.div`
  width: calc(100% * ${(props) => props.width} / 255);
  height: 20px;
  background-color: ${(props) => props.color=="hp" ? "#32cd32" : props.color=="attack" ? "#ff0000" : props.color=="defense" ? "#ffd700" : props.color=="special-attack" ? "#1e90ff" : props.color=="special-defense" ? "#9400d3" : "#ff8c00"};
`;