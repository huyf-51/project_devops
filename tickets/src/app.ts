import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rallycoding/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
import apm from 'elastic-apm-node';

apm.start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'Tickets',

    // Use if APM Server uses API keys for authentication
    apiKey: 'S2tsZGRwTUIweEJYYkt2Wk1sTDc6bU5iZVdMRHhSSHVkTnZ1TzRpMjlVUQ==',

    // Set custom APM Server URL (default: http://127.0.0.1:8200)
    serverUrl: 'https://devops-d51db7.apm.us-east-1.aws.elastic.cloud:443',

    environment: 'production',
});

const transaction = apm.startTransaction('tickets service');

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use((err: any, req: any, res: any, next: any) => {
    apm.captureError(err);
    next(err);
});

transaction.end();

app.use(errorHandler);

export { app };
