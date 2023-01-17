export const isNum = (text: string): boolean => !isNaN(+text);

export const extractNumberString = (text: string): string => {
  let result = '';

  for (const el of text) {
    if (!isNum(el)) {
      break;
    }
    result += el;
  }

  return result;
};

export const searchNumber = (searchString: string, text: string): string => {
  const foundIndex = text.indexOf(searchString);

  if (foundIndex == -1) {
    return '';
  }

  return extractNumberString(text.substring(foundIndex + searchString.length));
};

export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];
