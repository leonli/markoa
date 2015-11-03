require('babel-core/register');
require('babel-polyfill');

// Setup the node evnironment to global application context
global.__DEV_MODE__ = process.env.NODE_ENV !== 'production';
global.__PORT__ = process.env.PORT ? process.env.PORT : 3000;

require('./src/main');
