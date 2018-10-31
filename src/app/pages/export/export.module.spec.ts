import { ExpModule } from './export.module';

describe('ExpModule', () => {
  let expModule: ExpModule;

  beforeEach(() => {
    expModule = new ExpModule();
  });

  it('should create an instance', () => {
    expect(expModule).toBeTruthy();
  });
});
