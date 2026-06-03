const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'page.tsx');
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
const original = content;

// Replace /articles/${ with /articles?slug=${
content = content.replace(/\/articles\/\$\{/g, '/articles?slug=${');

if (original === content) {
  console.log('No replacements were needed or made.');
} else {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Replacements completed successfully.');
}
