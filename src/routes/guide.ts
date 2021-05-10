import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { FastifyPluginCallback } from 'fastify';

export const guide: FastifyPluginCallback = async (server): Promise<void> => {
    server.get('/', async (req, res) => {
        const filePath = path.resolve(__dirname, '../static/guide.html');
        res.type('text/html; charset=utf-8')
        res.send(await promisify(fs.readFile)(filePath));
    });
};
