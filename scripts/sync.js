
const { promises } = require('fs');
const { exec } = require('./utils/exec');

const fetchPath = async () => {
    try {
        const path = await promises.readFile('.path', 'utf8');
        return path;
    } catch (e) {
        const update = await ask('Enter your local hypelab-ts path:');
        await promises.writeFile('.path', update, 'utf8');
        return update;
    }
};

const run = async () => {
    const path = await fetchPath();

    const providers = await promises.readdir('.');
    const ignore = ['scripts', 'package.json'];

    for (const provider of providers) {
        if (ignore.includes(provider) || provider.startsWith('.')) continue;

        const providerPath = `${path}/dist/providers/${provider}`;
        const built = await alreadyExists(providerPath);

        if (!built) {
            console.error('You need to build hypelab-ts before you can sync');
            return;
        }

        const package = await json(providerPath + '/package.json');
        const projects = await promises.readdir(provider);

        for (const project of projects) {
            try {
                const modulePath = `${provider}/${project}/node_modules/${package.name}`;
                await exec('mkdir', ['-p', modulePath]);
                await exec('rsync', ['-avz', providerPath, modulePath]);
            } catch (e) {
                console.error(`Failed to sync module from ${path} to ${provider}`);
            }
        }
    }
}

run();

// MARK: Utils

const readline = require('readline');

const ask = prompt => new Promise(resolve => {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    interface.question(prompt, result => {
        resolve(result);
        interface.close();
    });
});

const json = async path => {
    try {
        const content = await promises.readFile(path, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
};

const alreadyExists = async path => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};
