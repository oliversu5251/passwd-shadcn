"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PasswordHistoryProps {
  currentPassword: string;
}

const PasswordHistory = ({ currentPassword }: PasswordHistoryProps) => {
  const { toast } = useToast();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (currentPassword) {
      setHistory((prev) => {
        const newHistory = [currentPassword, ...prev.filter(p => p !== currentPassword)];
        return newHistory.slice(0, 5); // Keep only last 5 passwords
      });
    }
  }, [currentPassword]);

  const copyPassword = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Password copied!",
        description: "Password has been copied to your clipboard.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Failed to copy password to clipboard.",
        variant: "destructive",
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Password history has been cleared.",
    });
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Recent Passwords</CardTitle>
        <Button
          onClick={clearHistory}
          variant="ghost"
          size="sm"
        >
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {history.map((password, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
          >
            <code className="text-sm text-muted-foreground font-mono flex-1 mr-2">
              {password}
            </code>
            <Button
              onClick={() => copyPassword(password)}
              variant="ghost"
              size="sm"
            >
              Copy
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { PasswordHistory };
