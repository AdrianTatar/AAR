import { ExportDialogModule } from './exp-add-dialog.module';


describe('ExportDialogModule', () => {
  let expDialogModule: ExportDialogModule;

  beforeEach(() => {
    expDialogModule = new ExportDialogModule();
  });

  it('should create an instance', () => {
    expect(expDialogModule).toBeTruthy();
  });
});
