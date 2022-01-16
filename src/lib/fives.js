import * as WORDS from './wordlist';

const EMPTY_LETTERS = ['', '', '', '', ''];

export const fives = (greyLetters = '', greenLetters = EMPTY_LETTERS, yellowLetters = EMPTY_LETTERS, words = WORDS) => {
  console.log('FIVES', greyLetters, greenLetters, yellowLetters);
  const patterns = [...greenLetters.keys()].map(i => 
    greenLetters[i] 
      ? greenLetters[i].toLowerCase() 
      : `(?![${greyLetters.toLowerCase() + yellowLetters[i].toLowerCase()}])[a-z]`);
  const pattern = new RegExp(patterns.join(''));

  // TODO Filter matches by yellow letters in any un-matched position.
  return words.filter(w => pattern.test(w));
}