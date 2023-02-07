const { data } = require('./data');
const { countElements, filterAnimals, getArguments } = require('./services');
const { ARGS_REGEX } = require('./constants');

const args = process.argv.slice(2);

const { filter, count } = getArguments(args, ARGS_REGEX);

let countries = [];

if (!!filter) {
  const filterReg = new RegExp(filter, 'i');
  countries = filterAnimals(data, filterReg);
} else {
  countries = data;
}

if (count) {
  countries = countElements(countries);
}

console.log(JSON.stringify(countries, null, '  '));
