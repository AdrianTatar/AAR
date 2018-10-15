import { PnRoutingModule } from './pn-routing.module';

describe('PnRoutingModule', () => {
  let pnRoutingModule: PnRoutingModule;

  beforeEach(() => {
    pnRoutingModule = new PnRoutingModule();
  });

  it('should create an instance', () => {
    expect(pnRoutingModule).toBeTruthy();
  });
});
