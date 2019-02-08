const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            let electronProcess  = exec('npm run electron',(er)=>{
              if(er){
                console.error(er)
              }
            });
            electronProcess.stdout.on('data', function(data) {
                console.log(data);
            });
            electronProcess.stderr.on('data', (data) => {
              console.log(data);
            });
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
