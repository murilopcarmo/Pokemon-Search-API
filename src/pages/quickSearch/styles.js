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
  min-width: 80px;
  width: auto;
  min-height: 32px;
  padding: 0 10px;
`;
