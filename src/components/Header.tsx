import { Newspaper } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Newspaper className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 blur-lg bg-primary/20 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NewsHub
            </h1>
            <p className="text-xs text-muted-foreground">Stay informed, stay ahead</p>
          </div>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};
