import { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { light, dark } from "../themes";

export const ThemeContext = createContext();

const localTheme =
  localStorage.getItem("theme") || process.env.REACT_APP_THEME?.toLowerCase();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localTheme);

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // useEffect(() => {
  //   const localTheme = localStorage.getItem("theme") || "light";
  //   setTheme(localTheme);
  // }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const deviceTheme = theme === "dark" ? dark : light;

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <StyledThemeProvider theme={deviceTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
