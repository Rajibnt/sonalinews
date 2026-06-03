const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(cmd, dir) {
  console.log(`⏳ Running: ${cmd} in ${dir || 'root'}`);
  execSync(cmd, { stdio: 'inherit', cwd: dir });
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`⚠️ Warning: Source folder ${from} does not exist.`);
    return;
  }
  if (fs.existsSync(to)) {
    fs.rmSync(to, { recursive: true, force: true });
  }
  fs.mkdirSync(to, { recursive: true });
  
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  // 1. Install dependencies
  runCommand('npm install', 'backend');
  runCommand('npm install', 'frontend');

  // 2. Build Frontend static site
  runCommand('npm run build', 'frontend');

  // 3. Move static build folder to backend public
  console.log('📂 Copying frontend static out folder to backend/public...');
  copyFolderSync('frontend/out', 'backend/public');
  console.log('✅ Copy complete.');

  // 4. Build Backend
  runCommand('npm run build', 'backend');

  console.log('🎉 Monorepo built successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
