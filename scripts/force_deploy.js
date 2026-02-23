
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("🚀 Starting FORCE Deployment...");

const distDir = path.resolve('dist');

try {
    // 1. Build
    console.log("🔨 Building project...");
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Prepare Dist
    console.log("📂 Preparing dist folder...");
    if (!fs.existsSync(distDir)) {
        throw new Error("Dist folder not found!");
    }

    // Ensure .nojekyll exists
    fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
    console.log("✅ Created .nojekyll");

    // 3. Git Operations
    console.log("📦 Committing to gh-pages...");

    // Navigate to dist, init git, add all, commit, force push
    // Note: We are using a temporary git repo in dist to push to origin/gh-pages

    const commands = [
        `cd dist && git init`,
        `cd dist && git remote add origin https://github.com/FURUYAN1234/nano-banana-pro.git`,
        `cd dist && git checkout -b gh-pages`,
        `cd dist && git add .`,
        `cd dist && git commit -m "Force Deploy v${Date.now()}"`,
        `cd dist && git push -f origin gh-pages`
    ];

    for (const cmd of commands) {
        console.log(`> ${cmd}`);
        execSync(cmd, { stdio: 'inherit' });
    }

    console.log("🎉 FORCE DEPLOYMENT COMPLETE!");

} catch (error) {
    console.error("❌ Deployment Failed:", error);
    process.exit(1);
}
