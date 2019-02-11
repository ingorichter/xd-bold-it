export const findStyleBlockForPosition = (styleBlocks, position) => {
  let result = {
    index: -1,
    offset: 0
  };

  for (let index = 0, offset = 0; index < styleBlocks.length; index++) {
    if (offset <= position.start && position.start <= (offset + styleBlocks[index].length)) {
      result = {
        index,
        offset
      };
      break;
    } else {
      offset += styleBlocks[index].length;
    }
  }

  return result;
};

export const findTextPositions = (text, searchString) => {
  const textPositions = [];
  const regex = new RegExp(searchString, 'g');
  let resultArray = regex.exec(text);
  while (resultArray !== null) {
    textPositions.push({
      start: resultArray.index,
      length: searchString.length,
    });

    resultArray = regex.exec(text);
  }

  return textPositions;
};


export const modifyStyleBlock = (styleBlock, position, offset) => {
  const result = [];

  const before = Object.assign({}, styleBlock);
  before.length = Math.abs(offset - position.start); //styleBlock.length > position.start ? position.start : Math.abs(styleBlock.length - offset);
  result.push(before);
  const updated = Object.assign({}, styleBlock);
  updated.length = position.length;
  updated.fontStyle = 'Bold';
  result.push(updated);
  const after = Object.assign({}, styleBlock);
  after.length = styleBlock.length - updated.length - before.length;
  result.push(after);

  return result;
};

export const replaceAndInsertIntoArray = (index, oldArray, toInsert) => {
  return [...oldArray.slice(0, index), ...toInsert, ...oldArray.slice(index + 1)];
};

export const updateStyleBlocks = (styleBlocks, textPositions) => {
  let newTextStyleRanges = styleBlocks; // start working on the original style blocks

  textPositions.forEach((position, posNum) => {
    console.log('Find Style Block where the text is located', position);
    // find the style range that contains the position that I want to embold
    const indexStyleBlockToModify = findStyleBlockForPosition(newTextStyleRanges, position);
    // console.log(indexStyleBlockToModify);
    // console.log("Original Text Style Ranges", newTextStyleRanges);
    const newStyleBlocks = modifyStyleBlock(newTextStyleRanges[indexStyleBlockToModify.index], position, indexStyleBlockToModify.offset);
    // console.log("New Style Blocks", newStyleBlocks);
    // console.log("Modified style blocks", newStyleBlocks);
    if (newTextStyleRanges.length === 1) {
      newTextStyleRanges = newStyleBlocks;
    } else {
      newTextStyleRanges = [...newTextStyleRanges.slice(0, indexStyleBlockToModify.index), ...newStyleBlocks, ...newTextStyleRanges.slice(indexStyleBlockToModify.index + 1)];
    }
  });

  return newTextStyleRanges;
};

/*
Begin: [ { length: 538,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Searching for these positions [ { start: 6, length: 5 },
  { start: 274, length: 5 },
  { start: 302, length: 5 } ]
Find Style Block where the text is located { start: 6, length: 5 }
Modified style blocks [ { length: 6,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 527,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Iteration 0 [ { length: 6,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 527,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Find Style Block where the text is located { start: 274, length: 5 }
Modified style blocks [ { length: 274,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 248,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Iteration 1 [ { length: 6,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 274,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 248,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Find Style Block where the text is located { start: 302, length: 5 }
Modified style blocks [ { length: 302,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: -59,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
Iteration 2 [ { length: 6,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 274,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 302,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: 5,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Bold',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } },
  { length: -59,
    fontFamily: 'Hoefler Text',
    fontStyle: 'Regular',
    fontSize: 20,
    charSpacing: 0,
    underline: false,
    textTransform: 'none',
    fill: { value: 4285558896 } } ]
*/
