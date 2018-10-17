import { ScrModule } from './scr.module';

describe('ScModule', () => {
  let scrModule: ScrModule;

  beforeEach(() => {
    scrModule = new ScrModule();
  });

  it('should create an instance', () => {
    expect(scrModule).toBeTruthy();
  });
});
