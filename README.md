IONIC 4 DEMO

DOC: https://beta.ionicframework.com/

npm install -g ionic

ionic start app blank --type=angular


*** Angular CLI
npm install -g @angular/cli

**** Install Capacitor

npm install -g npx

npm install --save @capacitor/cli @capacitor/core
npx cap init [appName] [appId]

Add Platforms

npx cap add ios
npx cap add android

Open IDE to build

npx cap open ios
npx cap open android

Using Ionic Native

npm install your-cordova-plugin
npx cap update

*** Electron
https://angularfirebase.com/lessons/desktop-apps-with-electron-and-angular/
Chaneg: <base href="./"> in index.html and all pages

npm install electron --save-dev

npx cap add electron

cd electron/
npm run electron:start


After any update: npx cap copy

*** Angular Firebase Plugin
npm install firebase @angular/fire --save

*** PWA
ng add @angular/pwa --project app
ionic build --prod  --service-worker
npm install -g serve

npm run pwa

DEPLOY:
sudo npm install -g firebase-tools
firebase login
firebase init
firebase use --add

*** DATABASE

npm install firebase angularfire2 --save

*** Google Sign in
npm i @ionic-native/google-plus@^5.0.0-beta
import { GooglePlus } from '@ionic-native/google-plus/npx';
npm install firebase @angular/fire promise-polyfill --save
sudo npm i -g cordova
ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID= --variable WEB_APPLICATION_CLIENT_ID=

*** Web Push Notifications
https://angularfirebase.com/lessons/fcm-topic-notifications-angularfire-and-callable-functions/

firebase init functions
https://angularfirebase.com/lessons/angular-firebase-authentication-tutorial-email-password-signup/
