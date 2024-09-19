package com.myapp.doomwatch;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "FirebaseMessaging")
public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Firebase Messaging auto-init and notification channel creation have been moved to MyApplication.java
  }
}
