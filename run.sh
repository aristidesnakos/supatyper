#!/bin/bash

# Install pnpm if not already installed
if ! command -v pnpm &> /dev/null
then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Remove node_modules and package-lock.json
echo "Cleaning up previous installation..."
rm -rf node_modules package-lock.json

# Install dependencies with pnpm
echo "Installing dependencies with pnpm..."
pnpm install

# Run the development server
echo "Starting the development server..."
pnpm dev
