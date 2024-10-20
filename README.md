Authentication
==============

Overview of the Task
--------------------

This project implements a **JWT-based authentication system** for a NestJS backend. The goal is to allow users to securely sign up and sign in, generating JWT tokens upon successful authentication. Additionally, user roles are managed separately, where user roles are retrieved via a secondary query involving the `users_roles` and `roles` tables. This approach allows fetching user roles dynamically without modifying the base entities (`User` and `Role`).

Sign-Up and Sign-In Logic
-------------------------

-   **Sign-Up Process**: The user is first checked against the database to ensure that no duplicate email exists. If the user does not exist, the password is hashed using bcrypt, and the user is created with encrypted credentials.
-   **Sign-In Process**: On sign-in, the user is retrieved from the database using their email, and their password is compared to the hashed password stored in the database. Upon successful validation, a JWT token is generated, which includes user-specific information like `email` and dynamically fetched `roles`.

Fetching User Roles
-------------------

In this implementation, we handled role management by:

1.  **Separate Query for Roles**: Since the `User` entity does not include a direct relationship with the `Role` entity, a separate query to the `users_roles` and `roles` tables is performed after user retrieval.
2.  **Dynamic Role Assignment**: After retrieving the `role_id`s from `users_roles`, the corresponding roles are queried from the `roles` table and assigned to the user for inclusion in the JWT payload.

### Approach to Role Management

-   **Many-to-Many Relationship**: Although the `User` entity does not include a direct relationship with `Role`, a join table (`users_roles`) is used to map users to their respective roles.
-   **Fetching Roles Separately**: The roles are fetched using two queries:
    1.  First, the `users_roles` table is queried to get the role IDs.
    2.  Then, the `roles` table is queried to get the actual role names.
-   **Including Roles in JWT Payload**: Once roles are fetched, they are added to the JWT token, ensuring that the user's roles are included in the session and can be used for authorization in other parts of the system.

Authentication Flow
-------------------

1.  **JWT-Based Authentication**: Upon successful sign-up or sign-in, the user is issued a JWT token that includes their `email`, `user_id`, and `roles`. This token is signed with a secret and is used to authorize future requests.
2.  **JWT Payload**: The payload includes key user information such as their `user_id`, `email`, and roles. The roles are dynamically fetched and embedded into the JWT payload to be used for role-based access control (RBAC) within the application.
3.  **Session Management**: The session management uses a JWT strategy, ensuring that the user's credentials and roles are encoded and stored securely in the token for the duration of the session.

Role-Based Access Control
-------------------------

The implementation also includes role-based access control (RBAC):

-   **Role-Based Restrictions**: Certain routes can be protected based on the user's roles. Roles are dynamically added to the user's session upon login, allowing the system to enforce restrictions based on roles.
-   **AuthGuard**: The `AuthGuard` ensures that only authenticated users with valid tokens can access protected routes. This guard checks for the presence of a valid JWT token in the request's authorization header.

Key Points in the Implementation
--------------------------------

-   **Users and Roles Management**: The system does not directly link `User` and `Role` entities. Instead, roles are fetched dynamically from the `users_roles` join table, ensuring flexibility in adding or modifying roles.
-   **JWT Tokens**: JWT tokens are used for authentication and authorization, carrying the user's essential information and roles.
-   **Separate Role Query**: Instead of modifying the `User` entity to include roles, roles are queried separately from the `users_roles` and `roles` tables, maintaining flexibility and compliance with the existing database schema.
 
<hr style="border:2px solid gray">

Authorization
=============

Overview of the Authorization Task
----------------------------------

This project not only implements **JWT-based authentication** but also provides **role-based access control (RBAC)** to restrict access to specific routes based on user roles. The role information is dynamically assigned during the authentication process and embedded in the JWT token. This ensures that the system can enforce different levels of access for different users based on their roles.

Role-Based Access Control (RBAC) Flow
-------------------------------------

1.  **Authorization Using JWT Tokens**: Each user, upon successful authentication, is issued a JWT token that includes their roles. This token is used for authorization on subsequent requests, ensuring that users only access endpoints they are authorized to.

2.  **JWT Payload**: The JWT payload contains essential user information, including `user_id`, `email`, and `roles`. These roles are dynamically fetched from the database during login and are embedded in the token for future authorization checks.

3.  **Role-Based Restrictions**: Access to certain endpoints is restricted based on roles. For instance, administrative routes might require an "admin" role, while user-specific routes may require a "user" role. The system checks the user's roles before allowing access to these endpoints.

Custom Roles Guard
------------------

A **custom roles guard** is implemented to enforce role-based access to routes. This guard checks if the user has the required roles before granting access to an endpoint. The process involves the following steps:

1.  **Extract JWT from the Authorization Header**: For each request, the guard extracts the JWT token from the `Authorization` header.

2.  **Verify JWT Token**: The JWT token is verified using the `JwtService` to ensure its validity. If valid, the guard proceeds to extract the roles from the token's payload.

3.  **Check User Roles**: The user's roles, extracted from the token, are compared with the roles required for the endpoint. The required roles are defined using a custom `@Roles()` decorator applied to each route.

4.  **Enforce Role-Based Access**: If the user's roles match any of the required roles for the endpoint, access is granted. If not, the user is denied access, and an appropriate error is returned.

How Roles Are Applied
---------------------

-   **@Roles() Decorator**: The `@Roles()` decorator is used to specify the roles required for accessing specific routes. This decorator is applied at the controller level or directly on specific route handlers. It sets metadata that the roles guard reads to enforce the role-based restrictions.

-   **Dynamic Role Fetching**: The roles are dynamically fetched from the `users_roles` table during the authentication process. This ensures that user roles can be updated independently from the authentication process, providing flexibility in managing roles.

Authorization Flow
------------------

1.  **JWT-Based Role Enforcement**: The user's roles are fetched during the sign-in or sign-up process and embedded in the JWT token. On each request, the token is sent in the `Authorization` header and is verified before accessing protected routes.

2.  **Roles in JWT Token**: After login, the JWT token carries the user's roles, which are included in the payload and used for role-based checks across the system.

3.  **AuthGuard and Roles Guard**: The **AuthGuard** ensures that only authenticated users with valid tokens can access protected routes. The **Roles Guard** further restricts access based on the user's roles, ensuring role-specific routes are only accessible by authorized users.

Authorization Highlights
------------------------

-   **Flexible Role Management**: Roles are not hardcoded into the `User` entity but are dynamically assigned and managed through the `users_roles` table. This allows for flexible and scalable role management, which is essential for large systems with evolving access control needs.

-   **Role-Based Route Protection**: Each route can be protected based on user roles, ensuring that users only have access to routes they are authorized to access. The roles guard makes it easy to define and enforce these restrictions.

-   **JWT Tokens for Role Enforcement**: The JWT tokens carry both authentication and authorization information, including the user's roles, ensuring that the same token can be used for both authentication and role-based access control. This reduces overhead while maintaining security.

----
----

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


----
----

Emails Module Documentation
---------------------------

**Purpose:**

The `emails` module provides functionality for sending and managing emails within the NestJS application. It integrates with a database to store email templates and leverages the `@nestjs-modules/mailer` package for sending emails.

**Key Features:**

-   **Sending Emails:**
    -   Sends emails directly using the `sendEmail` method.
    -   Sends emails using pre-defined templates stored in the database.
-   **Email Templates:**
    -   Manages email templates for reusable content.
    -   Allows for dynamic content replacement using placeholders.
-   **Database Integration:**
    -   Stores email templates in a database for easy management and reuse.

**Usage:**

1.  **Import the Module:** Import the `EmailsModule` in your `AppModule` to make it available throughout your application:

    TypeScript

    ```ts
    import { EmailsModule } from './emails/emails.module';

    @Module({
      imports: [
        // ... other modules
        EmailsModule,
      ],
      // ...
    })
    export class AppModule {}

    ```

2.  **Inject the EmailsService:** Inject the `EmailsService` into your controllers or services to access its methods:

    TypeScript

    ```ts
    import { EmailsService } from './emails/emails.service';

    @Controller('emails')
    export class EmailsController {
      constructor(private readonly emailsService: EmailsService) {}
    }

    ```

3.  **Use the `EmailsService` Methods:**

    -   **`sendEmail(to: string, subject: string, content: string)`:** Sends a direct email with the specified `to`, `subject`, and `content`.
    -   **`sendEmailFromTemplate(to: string, templateName: string, variables: Record<string, any>)`:** Sends an email using a template stored in the database.
    -   **`getAllTemplates()`:** Retrieves all email templates from the database.
    -   **`getTemplateByName(name: string)`:** Retrieves a specific email template by its name.

**Example Usage:**

TypeScript

```ts
import { EmailsService } from './emails/emails.service';

// ...

const emailsService = new EmailsService();

await emailsService.sendEmail('recipient@example.com', 'Subject', 'Email content');

const template = await emailsService.getTemplateByName('welcome');
await emailsService.sendEmailFromTemplate('newuser@example.com', template.name, { name: 'John Doe' });

```
