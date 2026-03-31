const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);
const stamp = new Date().toISOString().replace(/:/g, '-');
const tag = `test-run/v${pkg.version}-${stamp}`;

execSync(`git tag -a ${tag} -m "Test suite marker v${pkg.version} at ${stamp}"`, {
  stdio: 'inherit',
});
console.log(`Created annotated tag: ${tag}`);
