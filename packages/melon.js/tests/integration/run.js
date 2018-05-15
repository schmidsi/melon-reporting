import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('tests/integration/jasmine.json');
jasmine.configureDefaultReporter({
  timer: new jasmine.jasmine.Timer(),
  print(...args) {
    process.stdout.write(args.toString());
  },
  showColors: true,
});
jasmine.execute();
