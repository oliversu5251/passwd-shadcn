# Password Generator

A modern, secure password generator built with Next.js, TypeScript, and Shadcn UI components. This application helps users create strong, customizable passwords with real-time strength analysis.

## Features

### 🔐 Password Generation
- **Customizable Length**: Generate passwords from 4 to 50 characters
- **Character Options**: Choose from uppercase letters, lowercase letters, numbers, and special symbols
- **Real-time Generation**: Instantly generate new passwords with a single click
- **Secure Randomization**: Uses cryptographically secure random number generation

### 📊 Password Strength Analysis
- **Real-time Analysis**: Get instant feedback on password strength
- **Multiple Criteria**: Evaluates length, character variety, and complexity
- **Visual Indicators**: Color-coded strength bars and detailed breakdown
- **Security Tips**: Helpful guidance for creating stronger passwords

### 📋 Password History
- **Recent Passwords**: Keep track of your last 5 generated passwords
- **Quick Copy**: Copy any password from history with one click
- **Clear History**: Easily clear your password history for privacy

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient backgrounds with glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Toast Notifications**: User-friendly feedback for all actions

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd passwd-shadcn
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generating Passwords

1. **Adjust Length**: Use the slider to set your desired password length (4-50 characters)
2. **Select Options**: Toggle the switches to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Special symbols (!@#$%^&*...)
3. **Generate**: Click the "Generate Password" button to create a new password
4. **Copy**: Use the "Copy" button to copy the password to your clipboard

### Understanding Password Strength

The strength analyzer evaluates your password based on:
- **Length**: Longer passwords are stronger
- **Character Variety**: Mixing different character types increases security
- **Complexity**: Using special characters and numbers improves strength
- **Uniqueness**: Avoiding repeated patterns

### Security Tips

- Use unique passwords for each account
- Consider using a password manager for better security
- Enable two-factor authentication when available
- Regularly update your passwords
- Avoid using personal information in passwords

## Project Structure

```
passwd-shadcn/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── password-generator.tsx
│   ├── password-history.tsx
│   └── password-strength-analyzer.tsx
├── hooks/
│   └── use-toast.ts         # Toast notification hook
└── lib/                     # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

This password generator runs entirely in your browser. No passwords are sent to any server or stored anywhere. Your privacy and security are our top priorities.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Shadcn UI
