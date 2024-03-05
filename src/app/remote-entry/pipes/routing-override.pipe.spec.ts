import { RoutingOverridePipe } from './routing-override.pipe';

describe('RoutingOverridePipe', () => {
  beforeEach(() => {});
  it('create an instance', () => {
    const pipe = new RoutingOverridePipe('/');
    expect(pipe).toBeTruthy();
  });
});
