
const { promises } = require('fs');
const { exec } = require('./utils/exec');

const run = async () => {
    const providers = await promises.readdir('.');
    const ignore = ['scripts', 'package.json'];

    for (const provider of providers) {
        if (ignore.includes(provider) || provider.startsWith('.')) continue;

        const projects = await promises.readdir(provider);

        for (const project of projects) {
            if (ignore.includes(project) || project.startsWith('.')) continue;

            try {
                const result = await exec('npm', ['test'], { cwd: provider + '/' + project });
                console.log(result);
            } catch (e) {
                console.error(`Failed to run tests for ${provider}/${project}`);
                console.error(e);
            }
        }
    }
};

run();
