function getArguments(args, argsRegex) {
  if (args.length < 1) throw new Error(`this script takes at least 1 argument`);

  let filter;
  let count = false;

  args.forEach((arg) => {
    const argMatch = argsRegex.some((argRegex) => argRegex.test(arg));

    if (!argMatch) throw new Error(`${arg} is not a valid argument`);

    filter = argsRegex[0].test(arg) ? arg.split('=')[1] : filter;
    count = argsRegex[1].test(arg) ? true : count;
  });
  return { filter, count };
}

function filterAnimals(data, filterReg) {
  const countries = copyDeeplyNestedArr(data);
  return countries.reduce((dataAcc, dataCurr) => {
    dataCurr.people = dataCurr.people.reduce((peopleAcc, peopleCurr) => {
      peopleCurr.animals = peopleCurr.animals.filter((animal) =>
        filterReg.test(animal.name)
      );

      if (peopleCurr.animals.length > 0) return [...peopleAcc, peopleCurr];

      return peopleAcc;
    }, []);

    if (dataCurr.people.length > 0) return [...dataAcc, dataCurr];

    return dataAcc;
  }, []);
}

function countElements(data) {
  const countries = copyDeeplyNestedArr(data);
  return countries.map((el) => {
    el.name = el.name.concat(` [${el.people.length}]`);
    el.people = el.people.map((individual) => {
      individual.name = individual.name.concat(
        ` [${individual.animals.length}]`
      );
      return individual;
    });

    return el;
  });
}

function copyDeeplyNestedArr(arr) {
  return JSON.parse(JSON.stringify(arr));
}

module.exports = {
  countElements,
  filterAnimals,
  getArguments,
};
