import React, { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Switch from "@radix-ui/react-switch";
import { Button, Heading } from "@radix-ui/themes";
import { useTheme } from "../theme";
import { useI18n } from "../i18n";
import "./Header.css";

interface NavItem {
  label: string;
  id: string;
}

interface HeaderProps {
  navItems: NavItem[];
  activeItem: string;
  onNavigate: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  navItems,
  activeItem,
  onNavigate,
}) => {
  const { mode, toggleTheme } = useTheme();
  const { language, setLanguage } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <Heading className="header" size="2" color="crimson">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <h1>App</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav-desktop">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "solid" : "ghost"}
              onClick={() => handleNavClick(item.id)}
              className=""
              loading={false}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Controls */}
        <div className="header-controls">
          {/* ToggleGroup para Idioma */}
          <ToggleGroup.Root
            type="single"
            value={language}
            onValueChange={(value) => {
              if (value) setLanguage(value as "pt_BR" | "en_US");
            }}
            className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1"
          >
            <ToggleGroup.Item
              value="pt_BR"
              className="px-3 py-1 rounded text-sm font-medium transition-colors data-[state=on]:bg-white data-[state=on]:text-blue-600 data-[state=on]:shadow dark:data-[state=on]:bg-gray-600 dark:data-[state=on]:text-blue-400 text-gray-600 dark:text-gray-300"
            >
              PT
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="en_US"
              className="px-3 py-1 rounded text-sm font-medium transition-colors data-[state=on]:bg-white data-[state=on]:text-blue-600 data-[state=on]:shadow dark:data-[state=on]:bg-gray-600 dark:data-[state=on]:text-blue-400 text-gray-600 dark:text-gray-300"
            >
              EN
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          {/* Switch para Tema */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
            <span className="text-sm">☀️</span>
            <Switch.Root
              checked={mode === "dark"}
              onCheckedChange={toggleTheme}
              className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px] shadow-sm" />
            </Switch.Root>
            <span className="text-sm">🌙</span>
          </div>

          {/* Hamburger Menu */}
          <Button
            variant="ghost"
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="header-nav-mobile">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "solid" : "ghost"}
              onClick={() => handleNavClick(item.id)}
              className="mobile-nav-link"
            >
              {item.label}
            </Button>
          ))}
        </nav>
      )}
    </Heading>
  );
};

Header.displayName = "Header";
