// BSMLH Service Worker — Push уведомления
// Файл: firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBlD8lNdYdubHXr13IhPkmkCnNQQLChtVA',
  authDomain: 'bsmlh-chat.firebaseapp.com',
  databaseURL: 'https://bsmlh-chat-default-rtdb.firebaseio.com',
  projectId: 'bsmlh-chat',
  storageBucket: 'bsmlh-chat.firebasestorage.app',
  messagingSenderId: '41774666354',
  appId: '1:41774666354:web:e200d57a0bab89e26be8eb'
});

const messaging = firebase.messaging();

// Уведомления когда приложение свёрнуто или закрыто
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message:', payload);
  var title = (payload.notification && payload.notification.title) || 'BSMLH';
  var body = (payload.notification && payload.notification.body) || '';
  var options = {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      { action: 'open', title: 'Открыть' }
    ]
  };
  self.registration.showNotification(title, options);
});

// Клик по уведомлению — открывает приложение
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://alai-ali.github.io/bsmlh21/')
  );
});
