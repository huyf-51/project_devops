import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@rallycoding/common';
import { currentUserRouter } from './routes/current-user';

import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import apm from 'elastic-apm-node';

apm.start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'test',

    // Use if APM Server uses API keys for authentication
    apiKey: 'YUZyTFZwTUJxbG9XOFlrLS1RenI6ZHBWMVBHQzFRMTZKN2lHY2FrYlJZUQ==',

    // Set custom APM Server URL (default: http://127.0.0.1:8200)
    serverUrl: 'https://test-fd7764.apm.us-east-1.aws.elastic.cloud:443',

    environment: 'staging',
});

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use((err: any, req: any, res: any, next: any) => {
    apm.captureError(err);
    next(err);
});

app.use(errorHandler);

export { app };
