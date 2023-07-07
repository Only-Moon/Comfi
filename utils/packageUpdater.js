const fs = require('fs');
const axios = require('axios');
const { execSync } = require('child_process');

/**
 * Get the latest version of a package from the npm repository.
 * @param {string} packageName - The name of the package.
 * @returns {string} The latest version of the package.
 */
async function getLatestVersion(packageName) {
  const { data } = await axios.get(`https://registry.npmjs.org/${packageName}`);
  return data['dist-tags'].latest;
}

/**
 * Update the npm packages in the package.json file.
 */
async function updatePackages() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const { dependencies, devDependencies } = packageJson;

  for (const [packageName, currentVersion] of Object.entries(dependencies)) {
    const latestVersion = await getLatestVersion(packageName);
    if (latestVersion !== currentVersion) {
      dependencies[packageName] = latestVersion;
    }
  }

  for (const [packageName, currentVersion] of Object.entries(devDependencies)) {
    const latestVersion = await getLatestVersion(packageName);
    if (latestVersion !== currentVersion) {
      devDependencies[packageName] = latestVersion;
    }
  }

  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf8');
  execSync('yarn upgrade', { stdio: 'inherit' });
}

updatePackages();