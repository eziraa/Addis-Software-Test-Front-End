import styled from "styled-components";
import { ThemeProps } from "../../../styles/theme-interface";

export const HeaderComponent = styled.div<ThemeProps>`
  padding: 1.5 1rem;
  padding-right: 3.2rem;
  display: flex;
  justify-content: end;
  align-items: center;
  color: ${({ theme }) => theme.headerColor};
  position: fixed;
  width: 100%;
  height: 10rem;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }: ThemeProps) => theme.backgroundSecondary};
`;

export const Logo = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  font-family: "Robotto", sans-serif;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.8rem;
  left: 8rem;
  gap: 0.8rem;
  color: #07b8a0;
`;