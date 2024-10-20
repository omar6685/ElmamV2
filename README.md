Push Notifications Module Documentation
---------------------------------------

**Purpose:**

This module manages push notifications within the application. It allows admins, customers, and technical users to create and send notifications to users who have registered their devices.

**Key Features:**

-   **Notification Creation:** Create new notifications with title, body, and optional association with a user or message.
-   **Notification Management:** Retrieve, update, and delete existing notifications.
-   **Push Notification Delivery:** Send push notifications to users' registered devices using Firebase Cloud Messaging (FCM).
-   **Notification Tokens:** Manage user device registration tokens for push notification delivery.

**Module Structure:**

-   **`notifications.controller.ts`:** Handles incoming requests related to notifications:

    -   Create new notifications
    -   Retrieve all or a single notification
    -   Update notification details
    -   Delete notifications
    -   Send push notifications to users
-   **`notifications.service.ts`:** Provides core functionalities for notifications:

    -   Create, retrieve, update, and delete notifications
    -   Send push notifications using FCM
    -   Manage user notification tokens
-   **`notifications` Directory:** Contains entity definitions for:

    -   `Notification`: Represents a notification with title, body, and optional associations.
    -   `NotificationToken`: Represents a user's device registration token for push notifications.

**Usage:**

**1\. Dependency Injection:**

Inject the `NotificationsService` into your controllers where you need to interact with notifications.

TypeScript

```ts
import { NotificationsService } from './notifications/notifications.service';

@Controller('some-controller')
export class SomeController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // ... your controller methods
}

```

**2\. Creating Notifications:**

Call the `create` method on the injected `NotificationsService` with the appropriate data:

TypeScript

```ts
const notificationDto = { title: 'Important Update', body: 'New features available!' };

const newNotification = await this.notificationsService.create(notificationDto);

```

**3\. Sending Push Notifications:**

Use the `send` method to send notifications to users based on their ID and the notification content:

TypeScript

```ts
const userId = 123;
const title = 'Order Confirmation';
const body = 'Your order has been confirmed!';

const response = await this.notificationsService.send(userId, title, body);
console.log(response.message); // "Notification sent successfully"

```

**4\. User Notification Tokens:**

User notification tokens are managed separately. inside the auth module.
