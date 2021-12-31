const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withImages = require('next-images');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
});

module.exports = withImages({
  esModule: true,
});
