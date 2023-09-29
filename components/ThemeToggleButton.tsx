"use client";

import { useState, useEffect, useRef } from "react";

import { useTheme } from "next-themes";

import { SunIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/20/solid";
import { ComputerDesktopIcon } from "@heroicons/react/20/solid";

interface IconProps {
  className: string;
}

const menuOptions = [
  {
    theme: "light",
    title: "روشن",
    renderIcon: (props: IconProps) => <SunIcon {...props} />,
  },
  {
    theme: "dark",
    title: "تیره",
    renderIcon: (props: IconProps) => <MoonIcon {...props} />,
  },
  {
    theme: "system",
    title: "سیستم",
    renderIcon: (props: IconProps) => <ComputerDesktopIcon {...props} />,
  },
];

const ThemeToggleButton: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative">
      {resolvedTheme === "light" && (
        <SunIcon
          className="w-6 cursor-pointer text-primary"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      {resolvedTheme === "dark" && (
        <MoonIcon
          className="w-6 cursor-pointer text-primary"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 top-14 py-1 rounded bg-1 shadow dark:shadow-slate-400  z-10"
        >
          {menuOptions.map((option) => (
            <div
              key={option.theme}
              onClick={() => {
                setTheme(option.theme);
              }}
              className={`flex gap-2 py-1 px-3 cursor-pointer hover:bg-gray-200 hover:dark:bg-slate-800 ${
                option.theme === theme ? "text-primary" : "dark:text-slate-300"
              }`}
            >
              {option.renderIcon({
                className: `w-6`,
              })}
              <span>{option.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggleButton;
