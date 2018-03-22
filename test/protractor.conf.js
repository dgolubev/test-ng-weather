// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require("zone.js/dist/zone-node");
    require('zone.js/dist/long-stack-trace-zone');
    require('zone.js/dist/proxy.js');
    require('zone.js/dist/sync-test');
    require('zone.js/dist/jasmine-patch');
    require('zone.js/dist/async-test');
    require('zone.js/dist/fake-async-test');

    require('ts-node').register({
      project: 'test/e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
