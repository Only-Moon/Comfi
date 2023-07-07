const fs = require('fs');
const axios = require('axios');
const { execSync } = require('child_process');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

async function updatePackages(packages, type) {
  for (const [name, version] of Object.entries(packages)) {
    const { data } = await axios.get(`https://registry.npmjs.org/${name}`);
    const latestVersion = data['dist-tags'].latest;
    if (version !== latestVersion) {
      console.log(`Updating ${name} from version ${version} to ${latestVersion}`);
      packageJson[type][name] = latestVersion;
    }
  }
}

async function main() {
  await updatePackages(packageJson.dependencies, 'dependencies');
  await updatePackages(packageJson.devDependencies, 'devDependencies');
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  execSync('yarn upgrade', { stdio: 'inherit' });
}

main().catch(console.error);