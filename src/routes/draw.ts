import { Charts } from '../lib/charts';
import type { FastifyPluginCallback } from 'fastify';
import validator from 'validator';
import { ChartEngine } from '../types/lib/charts';
import { readUrl } from '../services/TableReaderService';

export const draw: FastifyPluginCallback = async (server): Promise<void> => {
    server.get('/draw', async (req, res) => {
        const query = req.query as { url?: string };
        if (!query.url || !validator.isURL(query.url)) {
            res.code(400).send();
        }
        const url = query.url as string;
        const data = await readUrl(url);
        const chart = new Charts(ChartEngine.highcharts);
        res.type('image/png');
        res.send(await chart.draw(data));
    });
};
