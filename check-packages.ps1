# npm Package Check Script
# Run this script after installing Node.js/npm

Write-Host "=== npm Package Check Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if npm is installed
try {
    $npmVersion = npm --version
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Node.js/npm not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "Visit: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules directory exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules not found. Installing packages..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "=== Checking for Outdated Packages ===" -ForegroundColor Cyan
Write-Host ""
npm outdated
Write-Host ""

Write-Host "=== Checking for Security Vulnerabilities ===" -ForegroundColor Cyan
Write-Host ""
npm audit
Write-Host ""

Write-Host "=== Installed Packages Summary ===" -ForegroundColor Cyan
Write-Host ""
npm list --depth=0
Write-Host ""

Write-Host "=== Package Information ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total packages (including dependencies):" -ForegroundColor Yellow
$packageCount = (npm list --json | ConvertFrom-Json).dependencies.Count
Write-Host "  Top-level packages: $packageCount" -ForegroundColor White

Write-Host ""
Write-Host "✅ Package check complete!" -ForegroundColor Green
