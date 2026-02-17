# npm Setup and Package Check Guide

## Current Status
- ✅ `package.json` exists and is valid
- ✅ `package-lock.json` exists
- ❌ Node.js/npm not installed
- ❌ `node_modules` directory missing (packages not installed)

## Step 1: Install Node.js and npm

### Option A: Download from Official Website (Recommended)
1. Visit: https://nodejs.org/
2. Download the LTS version (recommended for most users)
3. Run the installer and follow the setup wizard
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Option B: Using Chocolatey (if you have it)
```powershell
choco install nodejs
```

### Option C: Using Winget (Windows Package Manager)
```powershell
winget install OpenJS.NodeJS.LTS
```

## Step 2: Install Project Dependencies

After installing Node.js/npm, run:
```powershell
npm install
```

This will:
- Create `node_modules` directory
- Install all dependencies listed in `package.json`
- Use versions from `package-lock.json` for consistency

## Step 3: Check for Outdated Packages

```powershell
npm outdated
```

This shows which packages have newer versions available.

## Step 4: Check for Security Vulnerabilities

```powershell
npm audit
```

To automatically fix vulnerabilities:
```powershell
npm audit fix
```

For more detailed audit:
```powershell
npm audit --json
```

## Step 5: Verify Installation

```powershell
npm list --depth=0
```

This shows all top-level packages installed.

## Current Package Analysis

### Dependencies (5 packages):
- `clsx@2.1.1` - Utility for constructing className strings
- `gsap@^3.14.2` - Animation library
- `react@19.2.3` - React library (latest)
- `react-dom@19.2.3` - React DOM renderer
- `tailwind-merge@3.4.0` - Merge Tailwind CSS classes

### DevDependencies (9 packages):
- `@tailwindcss/vite@4.1.17` - Tailwind CSS Vite plugin
- `@types/node@^22.0.0` - TypeScript types for Node.js
- `@types/react@19.2.7` - TypeScript types for React
- `@types/react-dom@19.2.3` - TypeScript types for React DOM
- `@vitejs/plugin-react@5.1.1` - Vite plugin for React
- `tailwindcss@4.1.17` - Tailwind CSS framework
- `typescript@5.9.3` - TypeScript compiler
- `vite@7.2.4` - Build tool (latest)
- `vite-plugin-singlefile@2.3.0` - Single file build plugin

## Notes
- All packages appear to be using recent/current versions
- React 19.2.3 is the latest version
- Vite 7.2.4 is the latest version
- TypeScript 5.9.3 is a recent stable version
