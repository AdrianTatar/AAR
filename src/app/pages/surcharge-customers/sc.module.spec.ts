import { ScModule } from './sc.module';

describe('ScModule', () => {
  let scModule: ScModule;

  beforeEach(() => {
    scModule = new ScModule();
  });

  it('should create an instance', () => {
    expect(scModule).toBeTruthy();
  });
});
