import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

let initialized = false;

export const pendingRoute = { value: null };

export const initPushNotifications = async () => {

    console.log('Initializing push notifications...');
    if (!Capacitor.isNativePlatform() || initialized) return;
    initialized = true;

    await createNotificationChannel();
    // 1. Add listeners FIRST
    await PushNotifications.addListener('registration', token => {
        console.log('Device Token:', token.value);
        // Send token to your backend / Firestore
        localStorage.setItem('deviceToken', token.value);
    });

    await PushNotifications.addListener('registrationError', error => {
        console.error('Registration error:', error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Foreground notification:', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', action => {
        console.log('Notification tapped:', action);
        const route = action.notification.data?.route;
        pendingRoute.value = route;
        window.dispatchEvent(new Event('push-navigate'));
    });

    // 2. Permissions
    console.log('Checking push notification permissions...');
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive !== 'granted') {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
        console.warn('Push notification permission denied');
        return;
    }

    console.log('Push notification permission granted');
    // 3. Register with FCM / APNs
    await PushNotifications.register();
};


export const createNotificationChannel = async () => {
    console.log('Creating notification channel...');
    await PushNotifications.createChannel({
        id: 'default_channel',
        name: 'Enquiry Alerts',
        description: 'Default notification channel',
        importance: 5, // High importance
        visibility: 1, // Public visibility
        // sound: 'default', // Default sound
        vibration: true, // Enable vibration
    });
}