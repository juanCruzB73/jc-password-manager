import { passwordWords } from "./passwordWords";

const getSecureRandomInt = (max: number): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
};

const shuffleString = (str: string): string => {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = getSecureRandomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
};

export const createPasswordCharacterBased = (length: number): string => {
    if (length < 4) length = 4;

    const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_-+=";
    const allChars = uppers + lowers + numbers + symbols;

    let password = "";

    password += uppers[getSecureRandomInt(uppers.length)];
    password += lowers[getSecureRandomInt(lowers.length)];
    password += numbers[getSecureRandomInt(numbers.length)];
    password += symbols[getSecureRandomInt(symbols.length)];

    for (let i = 4; i < length; i++) {
        password += allChars[getSecureRandomInt(allChars.length)];
    }

    return shuffleString(password);
};

export const createPasswordWordBased = (length: number): string => {
    const wordList = passwordWords;
    const selectedWords: string[] = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = getSecureRandomInt(wordList.length);
        selectedWords.push(wordList[randomIndex]);
    }

    return selectedWords.join("-");
};
