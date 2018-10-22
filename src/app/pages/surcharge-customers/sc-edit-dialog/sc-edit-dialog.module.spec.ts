import { ScEditModule } from './sc-edit-dialog.module';

describe('ScEditModule', () => {
  let scEditModule: ScEditModule;

  beforeEach(() => {
    scEditModule = new ScEditModule();
  });

  it('should create an instance', () => {
    expect(scEditModule).toBeTruthy();
  });
});
