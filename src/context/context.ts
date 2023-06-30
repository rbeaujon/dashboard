import { createContext, Context } from "react";

interface ActiveMenuContextType {
  activeMenu: boolean; 
  setActiveMenu: (active: boolean) => void;
}

interface IsDarkContextType {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}


export const ActiveMenuContext: Context<ActiveMenuContextType | null> = createContext<ActiveMenuContextType | null>(null);
export const IsDarkContext: Context<IsDarkContextType | null> = createContext<IsDarkContextType | null>(null);
