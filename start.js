#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Quiz Application...\n');

// Check if backend dependencies are installed
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = path.join(__dirname, 'node_modules');

async function runCommand(command, args, cwd = __dirname, label = '') {
  return new Promise((resolve, reject) => {
    console.log(`${label ? `[${label}] ` : ''}Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function setup() {
  try {
    // Install frontend dependencies if needed
    if (!existsSync(frontendNodeModules)) {
      console.log('📦 Installing frontend dependencies...');
      await runCommand('npm', ['install'], __dirname, 'Frontend');
    }

    // Install backend dependencies if needed
    if (!existsSync(backendNodeModules)) {
      console.log('📦 Installing backend dependencies...');
      await runCommand('npm', ['install'], path.join(__dirname, 'backend'), 'Backend');
    }

    // Check if .env exists in backend
    const envPath = path.join(__dirname, 'backend', '.env');
    if (!existsSync(envPath)) {
      console.log('⚠️  Backend .env file not found. Creating from template...');
      await runCommand('cp', ['.env.example', '.env'], path.join(__dirname, 'backend'), 'Backend');
      console.log('✅ Created .env file. Please update it with your MongoDB URI if needed.');
    }

    // Check if database is seeded (this will fail gracefully if already seeded)
    console.log('🌱 Seeding database with questions...');
    try {
      await runCommand('npm', ['run', 'seed'], path.join(__dirname, 'backend'), 'Backend');
      console.log('✅ Database seeded successfully!');
    } catch (error) {
      console.log('ℹ️  Database might already be seeded or MongoDB not running.');
    }

    console.log('\n🎉 Setup complete! Starting development servers...\n');

    // Start both frontend and backend concurrently
    const child = spawn('npm', ['run', 'dev'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down servers...');
      child.kill('SIGINT');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down servers...');
      child.kill('SIGTERM');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();