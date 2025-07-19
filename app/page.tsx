"use client";

import { useState } from "react";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordHistory } from "@/components/password-history";
import { PasswordStrengthAnalyzer } from "@/components/password-strength-analyzer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [currentPassword, setCurrentPassword] = useState<string>("");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Main Content */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Password Generator
              </h1>
              <p className="text-muted-foreground">
                Generate secure, random passwords with customizable options
              </p>
            </div>
            <ThemeToggle />
          </div>
          <PasswordGenerator
            onPasswordGenerated={setCurrentPassword}
          />
          <PasswordStrengthAnalyzer
            password={currentPassword}
          />
        </div>

        {/* Sidebar - Password History */}
        <div className="w-80 hidden lg:block">
          <div className="sticky top-4">
            <PasswordHistory currentPassword={currentPassword} />
          </div>
        </div>

        {/* Mobile History - Show at bottom on mobile */}
        <div className="lg:hidden w-full mt-6">
          <PasswordHistory currentPassword={currentPassword} />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
