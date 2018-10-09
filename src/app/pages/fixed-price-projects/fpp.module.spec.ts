import { FppModule } from './fpp.module';

describe('FppModule', () => {
  let fppModule: FppModule;

  beforeEach(() => {
    fppModule = new FppModule();
  });

  it('should create an instance', () => {
    expect(fppModule).toBeTruthy();
  });
});
