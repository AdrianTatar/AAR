import { CbRoutingModule } from './cb-routing.module';

describe('CbRoutingModule', () => {
  let cbRoutingModule: CbRoutingModule;

  beforeEach(() => {
    cbRoutingModule = new CbRoutingModule();
  });

  it('should create an instance', () => {
    expect(cbRoutingModule).toBeTruthy();
  });
});
