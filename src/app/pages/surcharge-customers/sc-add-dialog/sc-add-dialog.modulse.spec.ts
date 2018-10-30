import { ScAddModule } from './sc-add-dialog.module';

describe('ScEditModule', () => {
  let scAddModule: ScAddModule;

  beforeEach(() => {
    scAddModule = new ScAddModule();
  });

  it('should create an instance', () => {
    expect(scAddModule).toBeTruthy();
  });
});
