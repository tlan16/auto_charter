import fetch from 'node-fetch';
import { closeApp, startApp } from '../../testSetup';

describe('GET /', () => {
    beforeAll(startApp);
    afterAll(closeApp);

    it('should return examples', async () => {
        const response = await fetch('http://127.0.0.1:3000/draw?' + new URLSearchParams({
            url: 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression',
        }))
        expect(response.ok).toBe(true);
        expect(response.headers.get('content-type')).toBe('image/png');
        expect(Number(response.headers.get('content-length'))).toBeGreaterThan(0);
    })
})
