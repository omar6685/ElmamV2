# Authentication

## Step 1: Setting Up the Project

First things first, we need to create a new NestJS project:

```bash\
nest new my-nestjs-app\
```

Now, let's install the required dependencies for handling JWT and authentication:

```bash\
cd my-nestjs-app\
npm install @nestjs/jwt \
```

## Step 2: Generating Authentication Modules and Services

NestJS makes it easy to organize code. Let's generate some core modules and services for our authentication system.

```bash\
nest g module auth\
nest g controller auth\
nest g service auth\
nest g module users\
nest g service users\
```

We now have the basic structure in place. Let's dive into the implementation.

## Step 3: Implementing the `UsersService`

The `UsersService` will manage user data. For simplicity, let's assume we have some predefined user data.

In the `users.service.ts` file, add the following:

```typescript\
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()\
export class UsersService {\
    private readonly users = [\
        // ... your user data\
    ];

    async findOne(username: string): Promise<User | undefined> {\
        return this.users.find(user => user.username === username);\
    }\
}\
```

This service simply fetches a user by their username. Now let's move on to the authentication logic.

## Step 4: Implementing the `AuthService`

In the `auth.service.ts` file, we'll implement the actual sign-in logic and handle JWT generation. Here's how:

```typescript\
import { Injectable, UnauthorizedException } from '@nestjs/common';\
import { JwtService } from '@nestjs/jwt';\
import { UsersService } from '../users/users.service';

@Injectable()\
export class AuthService {\
    constructor(\
        private usersService: UsersService,\
        private jwtService: JwtService\
    ) {}

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {\
        const user = await this.usersService.findOne(username);

        if (user?.password !== pass) {\
            throw new UnauthorizedException();\
        }\
        const payload = { sub: user.userId, username: user.username };\
        return {\
            access_token: await this.jwtService.signAsync(payload),\
        };\
    }\
}\
```

Here, we check if the user credentials are valid and return a JWT if everything checks out.

## Step 5: Implementing the `AuthController`

Next, we need an endpoint where users can log in and obtain their JWT. Add the following in `auth.controller.ts`:

```typescript\
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';\
import { AuthService } from './auth.service';

@Controller('auth')\
export class AuthController {\
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)\
    @Post('login')\
    signIn(@Body() signInDto: Record<string, any>) {\
        return this.authService.signIn(signInDto.username, signInDto.password);\
    }\
}\
```

This defines a `/login` route that the client will hit to get their token after successful authentication.

## Step 6: Configuring the `AuthModule`

Now we need to configure our `AuthModule` by importing the necessary dependencies and registering the `JwtModule`:

```typescript\
import { Module } from '@nestjs/common';\
import { AuthService } from './auth.service';\
import { AuthController } from './auth.controller';\
import { UsersModule } from '../users/users.module';\
import { JwtModule } from '@nestjs/jwt';\
import { jwtConstants } from './constants';

@Module({\
    imports: [\
        UsersModule,\
        JwtModule.register({\
            global: true,\
            secret: jwtConstants.secret,\
            signOptions: { expiresIn: '60s' },\
        }),\
    ],\
    providers: [AuthService],\
    controllers: [AuthController],\
})\
export class AuthModule {}\
```

We also specify how long the JWT token will be valid (in this case, 60 seconds).

## Step 7: Creating the Authentication Guard

Next, let's create an **AuthGuard** that will protect routes that require authentication. In `auth.guard.ts`:

```typescript\
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';\
import { JwtService } from '@nestjs/jwt';\
import { jwtConstants } from './constants';\
import { Request } from 'express';

@Injectable()\
export class AuthGuard implements CanActivate {\
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {\
        const request = context.switchToHttp().getRequest();\
        const token = this.extractTokenFromHeader(request);\
        if (!token) {\
            throw new UnauthorizedException();\
        }\
        try {\
            const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });\
            request['user'] = payload;\
        } catch {\
            throw new UnauthorizedException();\
        }\
        return true;\
    }

    private extractTokenFromHeader(request: Request): string | undefined {\
        const [type, token] = request.headers.authorization?.split(' ') ?? [];\
        return type === 'Bearer' ? token : undefined;\
    }\
}\
```

This guard checks the request header for a JWT and verifies it before allowing access to protected routes.

## Step 8: Protecting Routes

Now that we have our **AuthGuard**, we can protect routes by adding the `@UseGuards()` decorator. Here's an example of how you can secure a profile route:

```typescript\
@UseGuards(AuthGuard)\
@Get('profile')\
getProfile(@Request() req) {\
    return req.user;\
}\
```

This ensures only authenticated users can access their profile.

---
