import { FastifyPluginCallback } from 'fastify';
import { guide } from './guide';
import { draw } from './draw';

export const routes: FastifyPluginCallback = async (server): Promise<void> => {
    server.register(guide);
    server.register(draw);
};
