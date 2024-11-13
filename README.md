# Doomwatch - Technical Documentation

_A comprehensive technical guide for the Doomwatch mobile-first web app, developed in Angular.  
This documentation is intended for developers maintaining or extending the app,  
providing an in-depth understanding of its architecture, components, and workflows._

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure Summary](#project-structure-summary)
- [Technical Details](#technical-details)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

---

## Technologies Used

- **Angular** (v18)
- **Capacitor**
- **Firebase** (for notifications)
- **TypeScript**

## Technical Details

### `src/app/core/`
Contains core services, such as:
- **doomsday.service.ts**: Manages Doomsday Clock API interactions.
- **history-timeline.service.ts**: Fetches historical events for the timeline.

### `src/app/features/`
Components organized by feature, including:
- **doomsday-clock.component.ts**: Displays the current Doomsday Clock time.
- **doomsday-splash.component.ts**: Initial splash screen loading data.
- **settings.component.ts**: Allows users to manage notifications and alarm sounds.

### Notification and Alarm System
The notification system, using Firebase and Capacitor, provides configurable alarms for significant Doomsday events. This is not fully operational, and notifications will not be functional in the current state.

---

## Known Limitations

- **Incomplete Notification System**: The notification functionality for Doomsday events is only partially implemented.
- **No Deployment**: Doomwatch is not deployed, as it was created as part of a training exercise rather than a production-ready app.
- **Under Development**: Currently at about 90% completion. Remaining tasks are mostly minor but are necessary to reach full functionality.

---

## Future Enhancements

The following features may be considered to enhance the project:
- **Finalizing Notification System**: Complete and optimize notifications.
- **Full Deployment**: Prepare the app for production deployment if intended for a larger user base.
- **Polish and Testing**: Further polish UI/UX and perform extensive testing across devices.

---

## Contact

For any questions or support, feel free to reach out:

- **GitHub**: [LouisPatigny](https://github.com/LouisPatigny)
- **Email**: patignylouis@gmail.com

---

Thank you for exploring Doomwatch! ⏰
