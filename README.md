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