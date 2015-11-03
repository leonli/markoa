require('babel-core/register');
require('babel-polyfill');

// Setup the node evnironment to global application context
global.__DEV_MODE__ = process.env.NODE_ENV !== 'production';

require('./src/main');
