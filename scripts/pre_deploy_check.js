import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("🛡️ [Security Check] Validating Git Environment...");

try {
    // 1. Check for Merge State
    const gitDir = path.join(process.cwd(), '.git');
    if (fs.existsSync(path.join(gitDir, 'MERGE_HEAD'))) {
        console.error("❌ [CRITICAL] Git is in a MERGING state!");
        console.error("   You must resolve the merge and commit before deploying.");
        process.exit(1);
    }

    // 2. Check Branch Status
    const status = execSync('git status --porcelain').toString();
    if (status.length > 0) {
        console.warn("⚠️ [WARNING] You have uncommitted changes. These will be added automatically.");
    }

    // 3. Force Sync with Remote
    console.log("🔄 [Sync] Checking remote status...");
    execSync('git fetch origin main');

    // Check if behind
    const behind = execSync('git rev-list --count HEAD..origin/main').toString().trim();
    if (parseInt(behind) > 0) {
        console.warn(`⚠️ [WARNING] Your branch is behind by ${behind} commits. Trying to pull...`);
        try {
            execSync('git pull origin main --rebase');
            console.log("✅ [Sync] Successfully rebased with remote.");
        } catch (e) {
            console.error("❌ [ERROR] Pull failed. Please resolve conflicts manually.");
            process.exit(1);
        }
    }

    console.log("✅ [Security Check] Environment is Safe.");

} catch (error) {
    console.error("❌ [ERROR] Git validation failed:", error.message);
    process.exit(1);
}
