"use client";
import { createContext, useContext, useState } from "react";
import { themes } from "@/themes";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || themes[0].id
      : themes[0].id
  );
  const changeTheme = (id: string) => {
    setTheme(id);
    if (typeof window !== "undefined") localStorage.setItem("theme", id);
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
