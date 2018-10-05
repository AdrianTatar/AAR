import { KundenstammModule } from './kundenstamm.module';

describe('KundenstammModule', () => {
  let kundenstammModule: KundenstammModule;

  beforeEach(() => {
    kundenstammModule = new KundenstammModule();
  });

  it('should create an instance', () => {
    expect(kundenstammModule).toBeTruthy();
  });
});
