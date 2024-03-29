const { exec } = require('child_process');

const system = async(cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if(error) {
                // console.log('error', error);
                reject(error)
            }
    
            if(stderr) {
                // console.log('stderr', stderr);
                reject(stderr);
            }
    
            if(stdout) {
                // console.log('stdout', stdout);
                resolve(stdout);
            }
        })
    })
}

module.exports = system;