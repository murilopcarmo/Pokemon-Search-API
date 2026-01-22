import { Button } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

export const SearchButton = styled(Button)`
  width: 60px;
  height: 20px;
`;
