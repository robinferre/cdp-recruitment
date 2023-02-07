const { describe, expect, test } = require('@jest/globals');
const { getArguments } = require('../services');
const { ARGS_REGEX } = require('../constants');

const MOCK_WRONG_ARG = 'oups';
const MOCK_ARG_FILTER = '--filter=ry';
const MOCK_ARG_COUNT = '--count';

describe('getArguments', () => {
  test('should throw an error if there are no arguments passed', () => {
    try {
      getArguments([], ARGS_REGEX);
    } catch (e) {
      expect(e.message).toBe('this script takes at least 1 argument');
    }
  });

  test('should throw an error if the arguments passed are incorrect', () => {
    try {
      getArguments([MOCK_WRONG_ARG], ARGS_REGEX);
    } catch (e) {
      expect(e.message).toBe(`${MOCK_WRONG_ARG} is not a valid argument`);
    }
  });

  test('should throw an error if one of the arguments passed are incorrect', () => {
    try {
      getArguments([MOCK_ARG_FILTER, MOCK_WRONG_ARG], ARGS_REGEX);
    } catch (e) {
      expect(e.message).toBe(`${MOCK_WRONG_ARG} is not a valid argument`);
    }
  });

  test('should return an object with filter properly set and count set to false if the --filter=[str] arg is passed', () => {
    const { filter, count } = getArguments([MOCK_ARG_FILTER], ARGS_REGEX);
    expect(filter).toBe('ry');
    expect(count).toEqual(false);
  });

  test('should return an object with filter set to undefined and count to true if the --count arg is passed', () => {
    const { filter, count } = getArguments([MOCK_ARG_COUNT], ARGS_REGEX);
    expect(filter).toBe(undefined);
    expect(count).toEqual(true);
  });

  test('should return an object with filter properly set and count set to true if the both args are passed', () => {
    const { filter, count } = getArguments([MOCK_ARG_COUNT], ARGS_REGEX);
    expect(filter).toBe(undefined);
    expect(count).toEqual(true);
  });
});
