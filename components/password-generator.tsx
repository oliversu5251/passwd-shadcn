"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

interface PasswordGeneratorProps {
  onPasswordGenerated?: (password: string) => void;
}

const PasswordGenerator = ({ onPasswordGenerated }: PasswordGeneratorProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState<string>("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = useCallback(() => {
    const {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    } = options;

    let chars = "";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (chars === "") {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
    onPasswordGenerated?.(generatedPassword);
  }, [options, onPasswordGenerated]);

  const updateOptions = useCallback((newOptions: PasswordOptions) => {
    setOptions(newOptions);
  }, []);

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        toast({
          title: "Password copied!",
          description: "Password has been copied to your clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy password:", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy password to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const getPasswordStrength = (): PasswordStrength => {
    if (!password) return "weak";

    let score = 0;
    if (options.includeUppercase) score += 1;
    if (options.includeLowercase) score += 1;
    if (options.includeNumbers) score += 1;
    if (options.includeSymbols) score += 1;
    if (options.length >= 12) score += 1;
    if (options.length >= 16) score += 1;

    if (score <= 2) return "weak";
    if (score <= 3) return "medium";
    if (score <= 5) return "strong";
    return "very-strong";
  };

  const getStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-blue-500";
      case "very-strong":
        return "bg-green-500";
    }
  };

  const strength = getPasswordStrength();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Generate Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Display */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Generated Password
          </Label>
          <div className="flex gap-2">
            <Input
              id="password"
              value={password}
              readOnly
              placeholder="Click generate to create a password"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!password}
              variant="outline"
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Password Strength */}
        {password && (
          <div className="space-y-2">
            <Label>Password Strength</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor(
                    strength
                  )}`}
                  style={{
                    width:
                      strength === "weak"
                        ? "25%"
                        : strength === "medium"
                        ? "50%"
                        : strength === "strong"
                        ? "75%"
                        : "100%",
                  }}
                />
              </div>
              <span className="text-sm capitalize">{strength}</span>
            </div>
          </div>
        )}

        {/* Password Length */}
        <div className="space-y-2">
          <Label>
            Password Length: {options.length}
          </Label>
          <Slider
            value={[options.length]}
            onValueChange={(value) =>
              updateOptions({ ...options, length: value[0] })
            }
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* Password Options */}
        <div className="space-y-4">
          <Label>Password Options</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">
                Include Uppercase Letters
              </Label>
              <Switch
                id="uppercase"
                checked={options.includeUppercase}
                onCheckedChange={(checked) =>
                  updateOptions({ ...options, includeUppercase: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">
                Include Lowercase Letters
              </Label>
              <Switch
                id="lowercase"
                checked={options.includeLowercase}
                onCheckedChange={(checked) =>
                  updateOptions({ ...options, includeLowercase: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">
                Include Numbers
              </Label>
              <Switch
                id="numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) =>
                  updateOptions({ ...options, includeNumbers: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="symbols">
                Include Symbols
              </Label>
              <Switch
                id="symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) =>
                  updateOptions({ ...options, includeSymbols: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generatePassword}
          className="w-full"
          disabled={
            !options.includeUppercase &&
            !options.includeLowercase &&
            !options.includeNumbers &&
            !options.includeSymbols
          }
        >
          Generate Password
        </Button>
      </CardContent>
    </Card>
  );
};

export { PasswordGenerator };
