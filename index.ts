import sentenceCleaner from 'sentence-cleaner';

export type DetokenizeSupportedLang = 'en' | 'ru';

const enRe = /a-z/i;
const ruRe = /а-яё/i;

export const getSentenceLanguage = (sentence: string): DetokenizeSupportedLang | null {
  if (ruRe.test(sentence)) {
    return 'ru';
  } else if (enRe.test(sentence)) {
    return 'en';
  }
  return null;
}

export const normalizeSentenceEn = (sentence: string): string => {
  // for simplicity we suppose ' is always an apostrophe and is never used as a quote
  sentence = sentence.replace(/\s*\'/g, "'");

  // general clean
  sentence = sentenceCleaner(sentence);

  // fix spaces before ...
  sentence = sentence.replace(/\s+\./g, '.');

  sentence = sentence.replace(/^[^a-z]+/i, '');
  sentence = sentence.replace(/[^a-z\.\?\!\;]+$/i, '');

  // fix quotes
  let i = 0;
  sentence = sentence
    .replace(/\"/g, () => {
      return i++ % 2 === 0 ? '«' : '»';
    })
    .replace(/«\s+/gi, '«')
    .replace(/\s+»/gi, '»')
    .replace(/[«»]/gi, '"');

  // fix exceptions
  sentence = sentence.split("' em").join(" 'em");
  sentence = sentence.split("n '").join("n' ");

  sentence = sentence.trim();

  // remove unnecessary punctuation at the start of the sentence
  sentence = sentence.replace(/^[\,\.\;\:\?\!\-\=\~\s]+/g, '');
  sentence = sentence.replace(/[\-\=\~\s]+$/g, '');

  // remove space before % and &
  sentence = sentence.replace(/\s+([\%\&])/g, '$1');

  // if sentence ends with a letter, add a dot
  if (/a-zA-Z/.test(sentence[sentence.length - 1])) {
    sentence += '.';
  }

  return sentence;
}

export const normalizeSentenceRu = (sentence: string): string => {
  // general
  sentence = sentence
    .replace(/\s+([\,\.\;\:\?\!\)])/g, "$1")
    .replace(/([\(])\s+/g, "$1")
    .replace(/\s+([\*\\\/])\s+/g, "$1");

  // replace quotes with «»
  let i = 0;
  sentence = sentence.replace(/\"/g, () => {
    return i++ % 2 === 0 ? '«' : '»';
  });

  // normalize quotes
  sentence = sentence
    .replace(/«\s+/gi, '«')
    .replace(/\s+»/gi, '»');

  // capitalize letter at the beginning of the sentence
  sentence = sentence.replace(/([\.\?\!])\s*([а-яё])/gi,
    (text, punct, letter) => `${punct} ${letter.toUpperCase()}`
  );

  sentence = sentence.trim();

  // remove unnecessary punctuation at the start of the sentence
  sentence = sentence.replace(/^[\,\.\;\:\?\!\-\=\~\s]+/g, '');
  sentence = sentence.replace(/[\-\=\~\s]+$/g, '');

  // remove space before % and &
  sentence = sentence.replace(/\s+([\%\&])/g, '$1');

  // if sentence ends with a letter, add a dot
  if (/a-zA-Zа-яА-ЯёЁ/.test(sentence[sentence.length - 1])) {
    sentence += '.';
  }

  return sentence;
}

export const normalizeSentence = (sentence: string, lang?: DetokenizeSupportedLang): string => {
  lang = lang || getSentenceLanguage(sentence);
  if (lang === 'en') {
    return normalizeSentenceEn(sentence);
  } else if (lang === 'ru') {
    return normalizeSentenceRu(sentence);
  }
}

export const detokenizeSentence = (tokens: string[], lang?: DetokenizeSupportedLang) => {
  if (tokens.length === 0) {
    return '';
  }
  return normalizeSentence(tokens.join(' '), lang);
}
