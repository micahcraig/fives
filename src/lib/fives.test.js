import { fives } from './fives';

describe('.fives', () => {
    it('returns no results when all letters are eliminated', () => {
        const results = fives('abcdefghijklmnopqrstuvwxyz');
        expect(results).toHaveLength(0);
    });

    it('returns single result for unambiguous pattern', () => {
        const results = fives('', ['v', 'o', 'i', 'c', 'e'])
        expect(results).toHaveLength(1);
    })
});