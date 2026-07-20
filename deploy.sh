#!/bin/bash

echo "🚀 Starting Vercel Deployment Process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project locally to check for errors
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo "🎉 Deployment complete! Check your Vercel dashboard for the URL." 