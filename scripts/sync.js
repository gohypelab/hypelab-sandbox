const { promises } = require('fs');
const { exec } = require('./utils/exec');

const run = async () => {
  // Copy React components into react frameworks
  componentPath = './tests/react/src/components/';
  destinationPaths = ['./providers/react/next/src/components', './providers/react/remix/app/components'];
  let destinationPath;

  try {
    for (let i = 0; i < destinationPaths.length; i++) {
      destinationPath = destinationPaths[i];
      await exec('rsync', ['-avz', componentPath, destinationPath]);
    }
  } catch (e) {
    console.error(`Failed to sync module from ${componentPath} to ${destinationPath}`);
  }

  // Copy common cypress functions (e.g., intercepting ad request) into all frameworks
  cypressPath = './tests/common/cypress/';
  destinationPaths = [
    './providers/react/next/cypress',
    './providers/react/remix/cypress',
    './providers/vanilla/no-npm/cypress',
  ];

  try {
    for (let i = 0; i < destinationPaths.length; i++) {
      destinationPath = destinationPaths[i];
      await exec('rsync', ['-avz', cypressPath, destinationPath]);
    }
  } catch (e) {
    console.error(`Failed to sync module from ${cypressPath} to ${destinationPath}`);
  }

  // Copy e2e React-specific tests (e.g., using localhost:3000) into React frameworks
  cypressPath = './tests/react/cypress/';
  destinationPaths = ['./providers/react/next/cypress', './providers/react/remix/cypress'];

  try {
    for (let i = 0; i < destinationPaths.length; i++) {
      destinationPath = destinationPaths[i];
      await exec('rsync', ['-avz', cypressPath, destinationPath]);
    }
  } catch (e) {
    console.error(`Failed to sync module from ${cypressPath} to ${destinationPath}`);
  }
};

run();
