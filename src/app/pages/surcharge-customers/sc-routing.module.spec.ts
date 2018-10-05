import { ScRoutingModule } from './sc-routing.module';

describe('ScRoutingModule', () => {
  let scRoutingModule: ScRoutingModule;

  beforeEach(() => {
    scRoutingModule = new ScRoutingModule();
  });

  it('should create an instance', () => {
    expect(scRoutingModule).toBeTruthy();
  });
});
