import styled from "styled-components";
import { FooterContainer, FooterText, FooterLink } from "./components.style";
import {
  ThemeContext,
  ThemeContextType,
} from "../../../contexts/theme_context";
import { useContext } from "react";

const Footer = () => {
  const { theme } = useContext<ThemeContextType>(ThemeContext);

  return (
    <FooterContainer theme={theme}>
      <FooterText theme={theme}>
        Thank you for visiting our music website! We hope you've enjoyed
        exploring the rhythm and melodies we have to offer. Stay tuned for more
        tunes, updates, and musical magic. Feel free to reach out with any
        inquiries or feedback. Let the music play on, and may it accompany you
        through every beat of life's journey. Keep grooving and never stop
        listening!
      </FooterText>
      <FooterText theme={theme}>
        © {new Date().getFullYear()} EzAddis. All rights reserved. | Designed by
        {"Ezira Tigab "}
        <FooterLink href="">Ezira Tigab</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
