import styled from "styled-components";
import { ThemeProps } from "../../styles/theme-interface";

export const H0 = styled.h1<ThemeProps>`
  font-size: 2.1rem;
  font-family: monospace;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};
  padding-left: 1rem;
`;

export const H1 = styled.h1<ThemeProps>`
  font-size: 2.4rem;
  font-family: monospace;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  padding: 0;
`;

export const H2 = styled.h2<ThemeProps>`
  font-size: 1.6rem;
  font-family: monospace;
  font-weight: bold;
  color: ${({ theme }) => theme.outLinedBtnColor};
  margin: 0;
`;

export const H3 = styled.h3<ThemeProps>`
  font-size: 1.6rem;
  font-family: monospace;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};
  margin: 0;
`;
