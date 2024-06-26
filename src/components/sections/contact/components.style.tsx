import styled from "styled-components";
import { ThemeProps } from "../../../styles/theme-interface";

export const ContactContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
  display: flex;
  justify-content: space-between;
  gap: 6.4rem;
  width: 100%;
  padding-top: 20vh;
  margin-bottom: 20vh;
  @media screen and (max-width: 1000px) {
    width: 90%;
  }
`;

export const Title = styled.h2<ThemeProps>`
  font-size: 3rem;
  font-weight: 700;
  width: 13vw;
  text-align: start;
  margin-left: 10rem;
  color: transparent;
  position: relative;
  background-clip: text;
  position: relative;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.textPrimary},
    #09949a
  );
  &::after {
    content: "";
    width: 30%;
    height: 10%;
    position: absolute;
    bottom: -5%;
    left: 0;
    background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.textPrimary},
      #09949a
    );
  }
  &::before {
    content: "";
    width: 100%;
    height: 10%;
    position: absolute;
    top: -5%;
    left: 0;
    background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.textPrimary},
      #09949a
    );
  }
`;
export const ContactBody = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 80vw;
  gap: 3rem;
  flex-direction: column;
`;

export const ContactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;