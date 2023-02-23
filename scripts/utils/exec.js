
const { spawn } = require('child_process');

const exec = (cmd, args, opts) => new Promise((resolve, reject) => {
    const process = spawn(cmd, args, opts);
    
    let success = false;
    let output = [];

    process.stdout.on('data', data => {
        output.push(data.toString('utf8'));
    });

    process.stderr.on('data', data => {
        output.push(data.toString('utf8'));
    });

    process.on('exit', code => {
        success = code === 0;
    });

    process.on('close', () => {
        if (!success) return reject(output.join('\n'));
        resolve(output.join('\n'));
    });
});

module.exports = { exec };
