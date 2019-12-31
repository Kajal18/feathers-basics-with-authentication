const assert = require('assert');
const app = require('../../src/app');

describe('\'movie\' service', () => {
  it('registered the service', () => {
    const service = app.service('movie');

    assert.ok(service, 'Registered the service');
  });
});
