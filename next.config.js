import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache';

export default withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
})
