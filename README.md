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
