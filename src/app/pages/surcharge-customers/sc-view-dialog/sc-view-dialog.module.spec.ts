import { ScViewModule } from './sc-view-dialog.module';

describe('ScViewModule', () => {
  let scViewModule: ScViewModule;

  beforeEach(() => {
    scViewModule = new ScViewModule();
  });

  it('should create an instance', () => {
    expect(scViewModule).toBeTruthy();
  });
});
