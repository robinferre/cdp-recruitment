const { describe, expect, test } = require('@jest/globals');
const { filterAnimals } = require('../services');

const MOCK_FILTER = 'ar';
const MOCK_FILTER2 = 'Anoa';
const MOCK_FILTER3 = 'XXXXXX';

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
          { name: 'Voular' },
        ],
      },
    ],
  },
];

describe('filterAnimals', () => {
  test('should filter animals with the passed regex', () => {
    const countries = filterAnimals(MOCK_DATA, new RegExp(MOCK_FILTER, 'i'));

    expect(countries[0].people[0].animals).toStrictEqual([{ name: 'Narwhal' }]);
    expect(countries[0].people[1].animals).toStrictEqual([
      { name: 'Barbet' },
      { name: 'Voular' },
    ]);
  });

  test('empty array after filtering should not be returned', () => {
    const countries = filterAnimals(MOCK_DATA, new RegExp(MOCK_FILTER2, 'i'));
    const countries2 = filterAnimals(MOCK_DATA, new RegExp(MOCK_FILTER3, 'i'));

    expect(countries[0].people[0].animals).toStrictEqual([{ name: 'Anoa' }]);
    expect(countries[0].people[1]).toBeUndefined;
    expect(countries2).toStrictEqual([]);
  });
});
