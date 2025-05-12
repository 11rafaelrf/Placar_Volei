// Script para iniciar o servidor em ambientes Windows e outros
// Execute com: node start.js

const { exec } = require('child_process');
const os = require('os');

// Define o comando baseado no sistema operacional
let command = '';
if (os.platform() === 'win32') {
  // Para Windows
  command = 'set NODE_ENV=development && npx tsx server/index.ts';
} else {
  // Para Linux/Mac
  command = 'NODE_ENV=development npx tsx server/index.ts';
}

console.log(`Executando: ${command}`);

// Executa o comando
const child = exec(command);

// Captura e exibe a saída
child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (data) => {
  console.error(data);
});

child.on('close', (code) => {
  console.log(`Processo finalizado com código: ${code}`);
});