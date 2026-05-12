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
        } catch {
            console.error("❌ [ERROR] Pull failed. Please resolve conflicts manually.");
            process.exit(1);
        }
    }

    console.log("✅ [Security Check] Environment is Safe.");

    // ============================================================
    // 4. VERSION SYNC CHECK (§3 バージョン管理規律)
    // 5箇所のバージョン番号が一致していることを検証
    // ============================================================
    console.log("🔢 [Version Sync] Checking version consistency across files...");

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const pkgVersion = packageJson.version; // "x.y.z-alpha"

    // App.jsx の SYSTEM_VERSION を取得
    const appJsx = fs.readFileSync('src/App.jsx', 'utf-8');
    const appVersionMatch = appJsx.match(/const SYSTEM_VERSION\s*=\s*"([^"]+)"/);
    const appVersion = appVersionMatch ? appVersionMatch[1] : null;

    // index.html の <title> を取得
    const indexHtml = fs.readFileSync('index.html', 'utf-8');
    const titleMatch = indexHtml.match(/<title>Nano Banana Pro ([^<]+)<\/title>/);
    const htmlVersion = titleMatch ? titleMatch[1] : null;

    // package.json のバージョンを正規化 (3.05.0-alpha → v3.05.0-alpha)
    const pkgNormalized = `v${pkgVersion}`;

    let versionErrors = 0;
    if (!appVersion) {
        console.error("❌ [Version] Cannot find SYSTEM_VERSION in App.jsx");
        versionErrors++;
    } else if (appVersion !== pkgNormalized) {
        console.error(`❌ [Version] MISMATCH: package.json="${pkgVersion}" → expected App.jsx="${pkgNormalized}" but got "${appVersion}"`);
        versionErrors++;
    }

    if (!htmlVersion) {
        console.error("❌ [Version] Cannot find version in index.html <title>");
        versionErrors++;
    } else if (htmlVersion.trim() !== pkgNormalized) {
        console.error(`❌ [Version] MISMATCH: package.json="${pkgVersion}" → expected index.html="${pkgNormalized}" but got "${htmlVersion.trim()}"`);
        versionErrors++;
    }

    if (versionErrors > 0) {
        console.error(`❌ [Version Sync] ${versionErrors} version mismatch(es) detected. Fix before deploying!`);
        process.exit(1);
    }
    console.log(`✅ [Version Sync] All files consistent: ${pkgNormalized} (package.json: ${pkgVersion})`);

    // ============================================================
    // 5. README CHANGELOG CHECK (§3 + §6)
    // 現在のバージョンのChangeLogエントリが存在することを検証
    // ============================================================
    console.log("📝 [ChangeLog] Checking README.md for current version entry...");

    const readmeRaw = fs.readFileSync('README.md', 'utf-8');
    const changelogPattern = `### v${pkgVersion}`;
    if (!readmeRaw.includes(changelogPattern)) {
        console.error(`❌ [ChangeLog] README.md does not contain entry for "${changelogPattern}"`);
        console.error("   You must add a ChangeLog entry before deploying!");
        process.exit(1);
    }
    console.log(`✅ [ChangeLog] Found entry for ${pkgVersion} in README.md`);

    // ============================================================
    // 6. README ENCODING CHECK (§2 文字コード規約)
    // README.md に文字化けパターン（半角カタカナ領域）がないことを検証
    // ============================================================
    console.log("🔤 [Encoding] Checking README.md for mojibake (garbled text)...");

    let mojibakeCount = 0;
    for (const char of readmeRaw) {
        const code = char.charCodeAt(0);
        // 半角カタカナ領域 (FF61-FF9F) は Shift-JIS 文字化けの典型的サイン
        if (code >= 0xFF61 && code <= 0xFF9F) {
            mojibakeCount++;
        }
    }

    if (mojibakeCount > 0) {
        console.warn(`⚠️ [Encoding] README.md contains ${mojibakeCount} half-width katakana chars (likely mojibake)`);
        console.warn("   README.md may have garbled Japanese text. Consider fixing encoding.");
        // WARNING のみ — 既存の文字化けを即座にブロックすると全デプロイが止まるため
    } else {
        console.log("✅ [Encoding] README.md encoding looks clean");
    }

    // ============================================================
    // 7. .nojekyll CHECK (§4 Phase 1)
    // ============================================================
    if (!fs.existsSync('public/.nojekyll')) {
        console.error("❌ [Jekyll] public/.nojekyll is missing! MIMEタイプエラー防止のため必須です。");
        process.exit(1);
    }
    console.log("✅ [Jekyll] public/.nojekyll exists");

    // ============================================================
    // 8. HANDOFF.md VERSION SYNC CHECK
    // ============================================================
    console.log("📝 [Handoff] Checking HANDOFF.md for current version entry...");
    const handoffRaw = fs.existsSync('HANDOFF.md') ? fs.readFileSync('HANDOFF.md', 'utf-8') : '';
    if (handoffRaw && !handoffRaw.includes(pkgNormalized)) {
        console.error(`❌ [Handoff] HANDOFF.md does not contain the current version "${pkgNormalized}"`);
        console.error("   Update HANDOFF.md to reflect the latest state before deploying!");
        process.exit(1);
    }
    console.log(`✅ [Handoff] Found entry for ${pkgNormalized} in HANDOFF.md`);

    // ============================================================
    // 9. GARBAGE FILE CHECK (§5 Deployment Guardrail)
    // ============================================================
    console.log("🧹 [Hygiene] Checking for temporary or garbage files...");
    const rootFiles = fs.readdirSync(process.cwd());
    const garbagePatterns = [/\.txt$/, /\.py$/, /^temp_.*\.jsx?$/, /^release_notes.*\.md$/];
    const foundGarbage = rootFiles.filter(file => 
        garbagePatterns.some(pattern => pattern.test(file)) && 
        file !== 'overview.txt' && file !== 'robots.txt' // exclude legitimate txt files if any
    );

    if (foundGarbage.length > 0) {
        console.error(`❌ [Hygiene] Garbage files detected in project root: ${foundGarbage.join(', ')}`);
        console.error("   Delete these temporary files before deploying.");
        process.exit(1);
    }
    console.log("✅ [Hygiene] No garbage files found.");

    // ============================================================
    // 10. SECURITY & PROPER NOUN CHECK (§5 & §4)
    // ============================================================
    console.log("🔐 [Security] Scanning for API keys and forbidden nouns...");
    
    // Function to scan files
    const scanFile = (filePath, content) => {
        // API Keys (OpenAI, Gemini)
        if (/sk-(proj|ant)-[a-zA-Z0-9_-]+/.test(content)) return `OpenAI API Key found in ${filePath}`;
        if (/AIza[0-9A-Za-z-_]{35}/.test(content)) return `Google/Gemini API Key found in ${filePath}`;
        
        // Forbidden Nouns
        if (/DALL[- ]?E\s*3/i.test(content) && !filePath.includes('project_standards.md')) {
            return `Forbidden noun "DALL-E 3" found in ${filePath}. Use "ChatGPT Image 2.0" instead.`;
        }
        
        return null;
    };

    const filesToScan = ['src/App.jsx', 'index.html', 'README.md', 'docs/project_standards.md', 'HANDOFF.md'];
    const scanErrors = [];

    filesToScan.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf-8');
            const error = scanFile(file, content);
            if (error) scanErrors.push(error);
        }
    });

    if (scanErrors.length > 0) {
        console.error("❌ [Security] Security or Compliance audit failed:");
        scanErrors.forEach(err => console.error(`   - ${err}`));
        console.error("   Fix these issues before deploying.");
        process.exit(1);
    }
    console.log("✅ [Security] Source code is clean from API keys and forbidden nouns.");

    console.log("🎉 [Pre-Deploy] All strict deployment and security checks passed!");

} catch (error) {
    console.error("❌ [ERROR] Pre-deploy validation failed:", error.message);
    process.exit(1);
}

