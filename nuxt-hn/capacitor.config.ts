import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.benoiteirik.hn',
  appName: "L'Homme-Nouveau",
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    path: "../android"
  },
  /* server: {
    url: 'http://192.168.56.1:3000/',
    cleartext: true,
    androidScheme: 'http'
  } */
};

export default config;
