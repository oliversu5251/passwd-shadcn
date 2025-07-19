"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1">
        <Button variant="outline" size="sm" disabled>
          <Sun className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Moon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("light")}
        className="h-8 w-8 p-0"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="h-8 w-8 p-0"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("system")}
        className="h-8 w-8 p-0"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { ThemeToggle };
