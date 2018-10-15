import { PnModule } from './pn.module';

describe('ZkModule', () => {
  let pnModule: PnModule;

  beforeEach(() => {
    pnModule = new PnModule();
  });

  it('should create an instance', () => {
    expect(pnModule).toBeTruthy();
  });
});
