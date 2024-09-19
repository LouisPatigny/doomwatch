package com.myapp.doomwatch;

import android.app.NotificationManager;
import android.content.Context;
import android.util.Log;
import androidx.core.app.NotificationCompat;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

  private static final String TAG = "MyFirebaseMsgService";

  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    // Handle the received message here
    Log.d(TAG, "From: " + remoteMessage.getFrom());

    if (remoteMessage.getNotification() != null) {
      Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());

      // Show the notification when the app is in the foreground
      showNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
    }
  }

  @Override
  public void onNewToken(String token) {
    Log.d(TAG, "Refreshed token: " + token);
    // Send the token to your server or save it locally
  }

  private void showNotification(String title, String body) {
    // Build the notification with NotificationCompat
    NotificationCompat.Builder notificationBuilder =
      new NotificationCompat.Builder(this, getString(R.string.default_notification_channel_id))
        .setSmallIcon(R.mipmap.ic_launcher)  // You can customize the app icon here
        .setContentTitle(title)
        .setContentText(body)
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setAutoCancel(true);

    // Notify using NotificationManager
    NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    notificationManager.notify(0, notificationBuilder.build());
  }
}
