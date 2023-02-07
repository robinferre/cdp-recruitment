const { describe, expect, test } = require('@jest/globals');
const { countElements } = require('../services');

const MOCK_DATA = [
  {
    name: 'Dillauti',
    people: [
      {
        name: 'Winifred Graham',
        animals: [
          { name: 'Anoa' },
          { name: 'Duck' },
          { name: 'Narwhal' },
          { name: 'Badger' },
          { name: 'Cobra' },
          { name: 'Crow' },
        ],
      },
      {
        name: 'Blanche Viciani',
        animals: [
          { name: 'Barbet' },
          { name: 'Rhea' },
          { name: 'Snakes' },
          { name: 'Antelope' },
          { name: 'Echidna' },
          { name: 'Crow' },
          { name: 'Guinea Fowl' },
          { name: 'Deer Mouse' },
        ],
      },
    ],
  },
];

describe('countElements', () => {
  test('should count people and add that count next to the names of the countries in a new array', () => {
    const countries = countElements(MOCK_DATA);

    expect(countries[0].name).toBe('Dillauti [2]');
    expect(parseInt(countries[0].name.split('[')[1])).toBe(
      countries[0].people.length
    );
  });

  test('should count animals and add that count next to the names of the people in a new array', () => {
    const countries = countElements(MOCK_DATA);

    expect(countries[0].people[0].name).toBe('Winifred Graham [6]');
    expect(parseInt(countries[0].people[0].name.split('[')[1])).toBe(
      countries[0].people[0].animals.length
    );
  });

  test('other fields of the array should remain unchanged', () => {
    const countries = countElements(MOCK_DATA);

    expect(countries[0].people[0].animals).toStrictEqual(
      MOCK_DATA[0].people[0].animals
    );
  });
});
