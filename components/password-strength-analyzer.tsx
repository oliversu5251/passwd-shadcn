"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PasswordStrengthAnalyzerProps {
  password: string;
}

interface StrengthCriteria {
  name: string;
  met: boolean;
  description: string;
}

const PasswordStrengthAnalyzer = ({ password }: PasswordStrengthAnalyzerProps) => {
  if (!password) return null;

  const calculateStrength = () => {
    let score = 0;
    const criteria: StrengthCriteria[] = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
      criteria.push({
        name: "Minimum Length",
        met: true,
        description: "Password is at least 8 characters long"
      });
    } else {
      criteria.push({
        name: "Minimum Length",
        met: false,
        description: "Password should be at least 8 characters long"
      });
    }

    if (password.length >= 12) {
      score += 1;
      criteria.push({
        name: "Good Length",
        met: true,
        description: "Password is at least 12 characters long"
      });
    } else {
      criteria.push({
        name: "Good Length",
        met: false,
        description: "Password should be at least 12 characters long"
      });
    }

    // Character variety checks
    if (/[A-Z]/.test(password)) {
      score += 1;
      criteria.push({
        name: "Uppercase Letters",
        met: true,
        description: "Contains uppercase letters"
      });
    } else {
      criteria.push({
        name: "Uppercase Letters",
        met: false,
        description: "Should include uppercase letters"
      });
    }

    if (/[a-z]/.test(password)) {
      score += 1;
      criteria.push({
        name: "Lowercase Letters",
        met: true,
        description: "Contains lowercase letters"
      });
    } else {
      criteria.push({
        name: "Lowercase Letters",
        met: false,
        description: "Should include lowercase letters"
      });
    }

    if (/[0-9]/.test(password)) {
      score += 1;
      criteria.push({
        name: "Numbers",
        met: true,
        description: "Contains numbers"
      });
    } else {
      criteria.push({
        name: "Numbers",
        met: false,
        description: "Should include numbers"
      });
    }

    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      score += 1;
      criteria.push({
        name: "Special Characters",
        met: true,
        description: "Contains special characters"
      });
    } else {
      criteria.push({
        name: "Special Characters",
        met: false,
        description: "Should include special characters"
      });
    }

    // Entropy bonus
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.7) {
      score += 1;
      criteria.push({
        name: "Character Variety",
        met: true,
        description: "Good variety of characters"
      });
    } else {
      criteria.push({
        name: "Character Variety",
        met: false,
        description: "Try to use more varied characters"
      });
    }

    return { score, criteria, maxScore: 7 };
  };

  const { score, criteria, maxScore } = calculateStrength();
  const percentage = (score / maxScore) * 100;

  const getStrengthLabel = () => {
    if (percentage >= 85) return "Very Strong";
    if (percentage >= 70) return "Strong";
    if (percentage >= 50) return "Medium";
    if (percentage >= 30) return "Weak";
    return "Very Weak";
  };

  const getStrengthColor = () => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    if (percentage >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-center">Password Strength Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Strength */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Overall Strength</span>
            <span className="font-semibold">{getStrengthLabel()}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-center">
            <span className="text-muted-foreground text-xs">
              Score: {score}/{maxScore} ({percentage.toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Criteria List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Strength Criteria</h4>
          <div className="space-y-1">
            {criteria.map((criterion, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    criterion.met ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-muted-foreground text-xs">{criterion.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-muted/50 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Security Tips</h4>
          <ul className="text-muted-foreground text-xs space-y-1">
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
            <li>• Enable two-factor authentication when possible</li>
            <li>• Regularly update your passwords</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export { PasswordStrengthAnalyzer };
