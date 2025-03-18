import { createContext, useContext, useEffect, useState } from "react";
import * as PropTypes from "prop-types";

const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Always set to true

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark"); 
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleDarkMode = () => {
    console.log("Dark mode is always enabled.");
  };

  console.log(isDarkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.element,
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};