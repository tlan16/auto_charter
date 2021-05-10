import { LogService as Logger } from './services/LogService';
import Fastify from 'fastify';
import { Charts } from './lib/charts';
import { routes } from './routes';

export const app = Fastify()
app.register(routes);
app.addHook('onClose', async (instance, done) => {
    await Charts.destroy();
    done()
})

export async function start(port: number): Promise<void> {
    await Charts.init();
    const address = await app.listen(port);
    Logger.info(`Server listening at ${address}`);
}
