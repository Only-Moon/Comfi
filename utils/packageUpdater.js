const fs = require('fs').promises;
const axios = require('axios');
const { exec } = require('child_process');

async function updatePackages() {
  const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));

  for (const [name, version] of Object.entries(packageJson.dependencies)) {
    const { data } = await axios.get(`https://registry.npmjs.org/${name}`);
    const latestVersion = data['dist-tags'].latest;
    if (version !== latestVersion) {
      packageJson.dependencies[name] = latestVersion;
    }
  }

  for (const [name, version] of Object.entries(packageJson.devDependencies)) {
    const { data } = await axios.get(`https://registry.npmjs.org/${name}`);
    const latestVersion = data['dist-tags'].latest;
    if (version !== latestVersion) {
      packageJson.devDependencies[name] = latestVersion;
    }
  }

  await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));

  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

updatePackages().catch(console.error);