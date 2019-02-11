import {
  findTextPositions,
  findStyleBlockForPosition,
  modifyStyleBlock,
  updateStyleBlocks,
  replaceAndInsertIntoArray,
} from '../src/textStyleModifier';

describe('textStyleModifier', () => {
  describe('findTextPositions', () => {
    it('should find the positions of some text in a string', () => {
      const testText = 'This is a test and therefore the test should succeed';
      const searchTerm = 'test';
      const result = findTextPositions(testText, searchTerm);

      expect(result.length).toBe(2);
      expect(result[0].start).toBe(10);
      expect(result[0].length).toBe(4);
      expect(result[1].start).toBe(33);
      expect(result[1].length).toBe(4);
    });
  });
  describe('findStyleBlockForPosition', () => {
    it('should find the style Block where the text is located', () => {
      const testStyleBlock = [{
          length: 100,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896,
          },
        },
        {
          length: 200,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896,
          },
        },
      ];

      const searchTerm = {
        start: 210,
        length: 10,
      };

      const result = findStyleBlockForPosition(testStyleBlock, searchTerm);

      expect(result).toEqual({index: 1, offset: 100});
    });

    it('should return the last style Block where the text is located', () => {
      const testStyleBlock = [{
          length: 6,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 5,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Bold',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 527,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        }
      ];

      const searchTerm = {
        start: 274,
        length: 5
      };

      const result = findStyleBlockForPosition(testStyleBlock, searchTerm);

      expect(result).toEqual({index: 2, offset: 11});
    });
    it('should return the last style Block where the text is located with more elements', () => {
      const testStyleBlock = [{
          length: 6,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 5,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Bold',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 274,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 5,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Bold',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        },
        {
          length: 248,
          fontFamily: 'Hoefler Text',
          fontStyle: 'Regular',
          fontSize: 20,
          charSpacing: 0,
          underline: false,
          textTransform: 'none',
          fill: {
            value: 4285558896
          }
        }
      ];

      const searchTerm = {
        start: 302,
        length: 5,
      };

      const result = findStyleBlockForPosition(testStyleBlock, searchTerm);

      expect(result).toEqual({index: 4, offset: 290});
    });
  });

  describe('modifyStyleBlock', () => {
    it('should modify a style block and return 3 new style blocks', () => {
      const testStyleBlock = {
        length: 583,
        fontFamily: 'Hoefler Text',
        fontStyle: 'Regular',
        fontSize: 20,
        charSpacing: 0,
        underline: false,
        textTransform: 'none',
        fill: {
          value: 4285558896,
        },
      };

      const testPosition = {
        start: 180,
        length: 10,
      };

      const result = modifyStyleBlock(testStyleBlock, testPosition, 0);

      expect(result.length).toBe(3);
      expect(result[0].length).toBe(180);
      expect(result[1].length).toBe(10);
      expect(result[1].fontStyle).toBe('Bold');
      expect(result[2].length).toBe(393);
    });

    it('should modify a style block and return 3 new style blocks', () => {
      const testStyleBlock = {
        length: 248,
        fontFamily: 'Hoefler Text',
        fontStyle: 'Regular',
        fontSize: 20,
        charSpacing: 0,
        underline: false,
        textTransform: 'none',
        fill: {
          value: 4285558896
        }
      };

      const testPosition = {
        start: 302,
        length: 5,
      };

      const result = modifyStyleBlock(testStyleBlock, testPosition, 290);

      expect(result.length).toBe(3);
      expect(result[0].length).toBe(12);
      expect(result[1].length).toBe(5);
      expect(result[1].fontStyle).toBe('Bold');
      expect(result[2].length).toBe(231);
    });
  });
  describe('updateStyleBlocks', () => {
    it('should update all the style blocks and return an aray with updated style blocks', () => {
      const testStyleBlock = [{
        length: 538,
        fontFamily: 'Hoefler Text',
        fontStyle: 'Regular',
        fontSize: 20,
        charSpacing: 0,
        underline: false,
        textTransform: 'none',
        fill: {
          value: 4285558896,
        },
      }];

      const testText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no';

      const textPositions = findTextPositions(testText, 'ipsum');
      const result = updateStyleBlocks(testStyleBlock, textPositions);

      expect(result.length).toBe(7);
      expect(result[0].length).toBe(6);
      expect(result[1].length).toBe(5);
      expect(result[1].fontStyle).toBe('Bold');
      expect(result[2].length).toBe(263);
      expect(result[3].length).toBe(5);
      expect(result[4].length).toBe(23);
      expect(result[5].length).toBe(5);
      expect(result[6].length).toBe(231);
    });
  });

  describe('replaceAndInsertIntoArray', () => {
    it('should replace an existing array element and insert an array at the same spot', () => {
      expect(replaceAndInsertIntoArray(2, [0, 1, 2, 3], [3, 4, 5])).toEqual([0, 1, 3, 4, 5, 3]);
      expect(replaceAndInsertIntoArray(0, [0], [3, 4, 5])).toEqual([3, 4, 5]);
    });
  })
});


// [ { length: 182,
//   fontFamily: 'Hoefler Text',
//   fontStyle: 'Regular',
//   fontSize: 20,
//   charSpacing: 0,
//   underline: false,
//   textTransform: 'none',
//   fill: { value: 4285558896 } },
// { length: 5,
//   fontFamily: 'Hoefler Text',
//   fontStyle: 'Black',
//   fontSize: 20,
//   charSpacing: 0,
//   underline: false,
//   textTransform: 'none',
//   fill: { value: 4285558896 } },
// { length: 351,
//   fontFamily: 'Hoefler Text',
//   fontStyle: 'Regular',
//   fontSize: 20,
//   charSpacing: 0,
//   underline: false,
//   textTransform: 'none',
//   fill: { value: 4285558896 } } ]
