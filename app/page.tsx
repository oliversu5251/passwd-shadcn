"use client";

import { useState } from "react";
import { PasswordGenerator } from "@/components/password-generator";
import { PasswordHistory } from "@/components/password-history";
import { PasswordStrengthAnalyzer } from "@/components/password-strength-analyzer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Password Generator
          </h1>
          <p className="text-slate-300">
            Generate secure, random passwords with customizable options
          </p>
        </div>
        <PasswordGenerator
          onPasswordGenerated={setCurrentPassword}
          onOptionsChanged={setCurrentOptions}
        />
        <PasswordStrengthAnalyzer
          password={currentPassword}
          options={currentOptions}
        />
        <PasswordHistory currentPassword={currentPassword} />
      </div>
      <Toaster />
    </main>
  );
}
