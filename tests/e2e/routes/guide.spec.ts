import fetch from 'node-fetch';
import { closeApp, startApp } from '../../testSetup';

describe('GET /', () => {
    beforeAll(startApp);
    afterAll(closeApp);

    it('should return examples', async () => {
        const response = await fetch('http://127.0.0.1:3000/');
        expect(response.ok).toBe(true);
        expect(await response.text()).toContain('Examples');
    })
})
