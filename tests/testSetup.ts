import { app, start } from '../src/app';

export async function startApp(): Promise<void> {
    await start(3000);
    await Promise
}

export async function closeApp(): Promise<void> {
    await app.close();
}
