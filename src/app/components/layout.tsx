import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./bottom-nav";
import { PlanetSelector } from "./planet-selector";
import { MascotGuide } from "./mascot-guide";
import { StatusBar } from "./status-bar";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hideMascot = ["/profile", "/streak"].includes(location.pathname);

  // Determine if we need a light status bar (for dark backgrounds)
  const isDarkBg = ["/streak"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] relative overflow-x-hidden">
      <StatusBar theme={isDarkBg ? "light" : "dark"} />
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">
        {isHome && <PlanetSelector />}
        <Outlet />
      </div>
      {!hideMascot && <MascotGuide />}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <BottomNav />
      </div>
    </div>
  );
}