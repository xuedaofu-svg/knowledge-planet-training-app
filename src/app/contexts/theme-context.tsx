import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "orange" | "green";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  gradient: string;
}

const themes: Record<ThemeType, ThemeColors> = {
  orange: {
    primary: "#FF7A00",
    primaryHover: "#FF8C1A",
    primaryLight: "#FFF4E6",
    primaryDark: "#E66D00",
    secondary: "#3B82F6",
    secondaryLight: "#DBEAFE",
    gradient: "from-yellow-400 to-orange-500",
  },
  green: {
    primary: "#339586",
    primaryHover: "#3DAA99",
    primaryLight: "#E6F7F4",
    primaryDark: "#2A7A6E",
    secondary: "#2D7A8F",
    secondaryLight: "#D4EDF1",
    gradient: "from-teal-400 to-emerald-600",
  },
};

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("app-theme");
    return (saved as ThemeType) || "green";
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "orange" ? "green" : "orange"));
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}