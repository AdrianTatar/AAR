import { KsRoutingModule } from './ks-routing.module';

describe('KsRoutingModule', () => {
  let ksRoutingModule: KsRoutingModule;

  beforeEach(() => {
    ksRoutingModule = new KsRoutingModule();
  });

  it('should create an instance', () => {
    expect(ksRoutingModule).toBeTruthy();
  });
});
