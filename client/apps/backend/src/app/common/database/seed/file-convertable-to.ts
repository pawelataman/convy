const fileConvertableToMap = new Map<number, number[]>();

const png = [2, 3, 4, 7, 8, 11];
const avif = [1, 3, 4, 7, 8, 11];
const bmp = [1, 2, 4, 7, 8, 11];
const gif = [1, 2, 3, 7, 8, 11];
const jpeg = [1, 2, 3, 4, 8, 11];
const jpg = [1, 2, 3, 4, 8, 11];
const svg = [1, 2, 3, 4, 7, 8, 11];
const tiff = [1, 2, 3, 4, 7, 8, 11];
const webp = [1, 2, 3, 4, 7, 8];

fileConvertableToMap.set(1, png);
fileConvertableToMap.set(2, avif);
fileConvertableToMap.set(3, bmp);
fileConvertableToMap.set(4, gif);
fileConvertableToMap.set(7, jpeg);
fileConvertableToMap.set(8, jpg);
fileConvertableToMap.set(11, svg);
fileConvertableToMap.set(12, tiff);
fileConvertableToMap.set(13, webp);

const fileConvertableToArr = [];

Array.from(fileConvertableToMap.entries()).forEach((entry) => {
  entry[1].forEach((cId) => {
    fileConvertableToArr.push({
      fileTypeId: entry[0],
      convertableToId: cId,
    });
  });
});

export const fileConvertableTo = fileConvertableToArr;
