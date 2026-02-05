const lucide = require('lucide-react');

const requiredIcons = ['Globe', 'Edit3', 'AlertTriangle', 'CheckCircle2'];

console.log("--- Checking Icon Exports ---");
let errors = 0;
requiredIcons.forEach(icon => {
    if (lucide[icon]) {
        console.log(`✅ ${icon}: Found`);
    } else {
        console.error(`❌ ${icon}: NOT FOUND in lucide-react exports!`);
        errors++;
    }
});

if (errors > 0) {
    console.log("--- Conclusion: CRITICAL MISSING ICONS ---");
    console.log("Available keys (first 10):", Object.keys(lucide).slice(0, 10));
} else {
    console.log("--- Conclusion: All icons present ---");
}
