package com.myapp.doomwatch;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import com.google.firebase.messaging.FirebaseMessaging;

public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    // Enable Firebase Messaging auto-init
    FirebaseMessaging.getInstance().setAutoInitEnabled(true);

    // Create notification channel
    createNotificationChannel();
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      // Create the NotificationChannel
      CharSequence name = getString(R.string.default_notification_channel_id);
      String description = "Channel for Doomsday notifications";
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel channel = new NotificationChannel(
        getString(R.string.default_notification_channel_id),
        name,
        importance
      );
      channel.setDescription(description);

      // Register the channel with the system
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }
}
