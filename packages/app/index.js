try {
    require('electron-reloader')(module);
} catch(_) {}

require('ts-node').register();

const App = require('./src/app/index.ts').MobberApp
new App().run();
console.log('lol');