/*
try {
  require('electron-reloader')(module);
} catch (_) {}
*/

require('ts-node').register();

const App = require('../src/electron/app/index.ts').MobberApp;
new App().run();
