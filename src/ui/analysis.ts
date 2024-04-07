import {
  getTotalParagraphs,
  getTotalWords,
  getTotalCharacters,
  getTotalShortWords,
  getTotalLongWords,
  listWords,
  getPalindromes,
  calculateWordIncidence,
  getRandomWords,
  getWordsReversed,
} from "../analytics/index.js";

const totalsContainer = document.querySelector(".totals");
const shortAndLongWordsContainer = document.querySelector(".short-long");
const palindromesContainer = document.querySelector(".palindromes");
const frequenciesContainer = document.querySelector(
  ".frequencies .frequencies-list"
);
const randomWordsContainer = document.querySelector(".random");
const reversedWordsContainer = document.querySelector(".reversed-words");
const reversedTextContainer = document.querySelector(".reversed-text");
const forbiddenContainer = document.querySelector(".forbidden");
const camelCaseContainer = document.querySelector(".camel-case");
const kebabCaseContainer = document.querySelector(".kebab-case");
const snakeCaseContainer = document.querySelector(".snake-case");

if (
  !totalsContainer ||
  !shortAndLongWordsContainer ||
  !palindromesContainer ||
  !frequenciesContainer ||
  !randomWordsContainer ||
  !reversedWordsContainer ||
  !reversedTextContainer ||
  !forbiddenContainer ||
  !camelCaseContainer ||
  !kebabCaseContainer ||
  !snakeCaseContainer
) {
  throw new Error("Missing elements");
}

const renderParagraphsTotal = (paragraphsTotal: number): void => {
  totalsContainer.querySelector(".paragraphs-count")!.textContent =
    paragraphsTotal.toString();
};

const renderWordsTotal = (wordsTotal: number): void => {
  totalsContainer.querySelector(".words-count")!.textContent =
    wordsTotal.toString();
};

const renderCharactersTotal = (charactersTotal: number): void => {
  totalsContainer.querySelector(".characters-count")!.textContent =
    charactersTotal.toString();
};

const renderShortWordsTotal = (shortWordsTotal: string[]): void => {
  document.querySelector(".short-words-count")!.textContent =
    shortWordsTotal.length.toString();
};

const renderLongWordsTotal = (longWordsTotal: string[]): void => {
  document.querySelector(".long-words-count")!.textContent =
    longWordsTotal.length.toString();
};

const renderShortWordsList = (shortWords: string): void => {
  shortAndLongWordsContainer.querySelector(".short-words")!.textContent =
    shortWords;
};

const renderLongWordsList = (longWords: string): void => {
  shortAndLongWordsContainer.querySelector(".long-words")!.textContent =
    longWords;
};

const renderPalindromes = (palindromes: string): void => {
  palindromesContainer.querySelector(".palindromes")!.textContent = palindromes;
};

const renderRandomWords = (randomWords: string): void => {
  randomWordsContainer.querySelector(".random-words")!.textContent =
    randomWords;
};

const renderForbiddenWords = (forbiddenWords: string): void => {
  forbiddenContainer.querySelector(".censured-text")!.textContent =
    forbiddenWords;
};

const renderReversedWords = (reversedWords: string): void => {
  reversedWordsContainer.querySelector(".reversed-words-list")!.textContent =
    reversedWords;
};

const renderReversedText = (reversedText: string): void => {
  reversedTextContainer.querySelector(".reversed-text-list")!.textContent =
    reversedText;
};

const renderCamelCase = (camelCaseText: string): void => {
  camelCaseContainer.querySelector(".camel-case-text")!.textContent =
    camelCaseText;
};

const renderKebabCase = (kebabCaseText: string): void => {
  kebabCaseContainer.querySelector(".kebab-case-text")!.textContent =
    kebabCaseText;
};

const renderSnakeCase = (snakeCaseText: string): void => {
  snakeCaseContainer.querySelector(".snake-case-text")!.textContent =
    snakeCaseText;
};

const listenRandomWordsChanges = (text: string): void => {
  forbiddenContainer
    .querySelector("input")!
    .addEventListener("input", (event) => {
      // The variable forbiddenWords contains the words entered by the user in the input, already splitted
      const forbiddenWords = (event.target as HTMLInputElement).value.split(
        /,\s*/
      );

      // Render the forbidden words
    });
};

const listenFrequenciesChanges = (text: string): void => {
  frequenciesContainer
    .querySelectorAll("input")
    .forEach((frequencyInput, index) => {
      frequencyInput.addEventListener("input", (event) => {
        // The variable word contains the text entered by the user in the input
        const word = (event.target as HTMLInputElement).value;

        // Implement the frequency calculation here and delete this 0
        const frequency = calculateWordIncidence(text, word);

        frequenciesContainer.querySelector(
          `.word-${index + 1}-frequency`
        )!.textContent = frequency.toString();
      });
    });
};

export const analyzeText = (text: string): void => {
  listenFrequenciesChanges(text);
  listenRandomWordsChanges(text);

  renderParagraphsTotal(getTotalParagraphs(text));
  renderWordsTotal(getTotalWords(text));
  renderCharactersTotal(getTotalCharacters(text));
  renderShortWordsTotal(getTotalShortWords(text, 4));
  renderLongWordsTotal(getTotalLongWords(text, 8));
  renderLongWordsList(listWords(getTotalLongWords(text, 8)));
  renderShortWordsList(listWords(getTotalShortWords(text, 4)));
  renderPalindromes(getPalindromes(text).join(", ").toUpperCase());
  renderRandomWords(getRandomWords(text, 3).join(", ").toUpperCase());
  renderReversedWords(getWordsReversed(text));
  // Implement the rest of the analysis here
};
