import { fives } from './fives';

describe('.fives', () => {
    it('returns no results when all letters are eliminated', () => {
        const results = fives('abcdefghijklmnopqrstuvwxyz');
        expect(results).toHaveLength(0);
    });

    it('returns single result for unambiguous pattern', () => {
        const results = fives('', ['v', 'o', 'i', 'c', 'e'])
        expect(results).toHaveLength(1);
    });

    it('removes all greenLetters and yellowLetters from greyLetters to avoid over-eliminating', () => {
        const unfilteredWords = fives(
            '', 
            ['a', '', '', '', ''], 
            ['', 't', '', '', '']
        );

        const greyDupsRemoved = fives(
            'at', 
            ['a', '', '', '', ''], 
            ['', 't', '', '', '']
        );

        expect(greyDupsRemoved).toHaveLength(unfilteredWords.length);
    });

    it('filter matches by yellow letters in any un-matched position', () => {
        const unfiltered = fives(
            '', 
            ['', 'o', 'l', 'a', 'r']
        );

        const filtered = fives(
            '', 
            ['', 'o', 'l', 'a', 'r'],
            ['', '', '', '', 's']
        );

        expect(filtered).not.toEqual(unfiltered);
        expect(filtered).toHaveLength(1);
        expect(filtered[0]).toEqual('solar');
    });
});