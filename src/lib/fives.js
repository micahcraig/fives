import {words as WORDS} from './wordlist';

const EMPTY_LETTERS = ['', '', '', '', ''];

// TODO sort by duplicate letters
// TODO sort by frequency in common usage?

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const letterToLower = l => l.toLowerCase();

export const fives = (greyLetters = '', greenLetters = EMPTY_LETTERS, yellowLetters = EMPTY_LETTERS, words = WORDS) => {
  console.info('FIVES', greyLetters, greenLetters, yellowLetters);
  // Remove all greenLetters and yellowLetters from greyLetters to avoid over-eliminating
  const allYellow = yellowLetters.flatMap(letterToLower);
  const allGreenAndYellow = [
    ...greenLetters.flatMap(letterToLower),
    ...allYellow
  ].filter(onlyUnique).join('');
  const filteredGreys = greyLetters.replace(new RegExp(`[${allGreenAndYellow}]`, 'g'), '');
  const patterns = [...greenLetters.keys()].map(i => 
    greenLetters[i] 
      ? greenLetters[i].toLowerCase() 
      : `(?![${filteredGreys.toLowerCase() + yellowLetters[i].toLowerCase()}])[a-z]`);
  const pattern = new RegExp(patterns.join(''));

  const yellowPattern = new RegExp(allYellow.join(''));

  // Filter matches by yellow letters in any un-matched position.
  return words.filter(w => pattern.test(w) && yellowPattern.test(w));
}