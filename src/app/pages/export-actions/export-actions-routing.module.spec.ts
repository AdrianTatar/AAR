import { ExportActionsRoutingModule } from './export-actions-routing.module';

describe('ExportActionsRoutingModule', () => {
    let exportActionsRoutingModule: ExportActionsRoutingModule;

    beforeEach(() => {
        exportActionsRoutingModule = new ExportActionsRoutingModule();
    });

    it('should create an instance', () => {
        expect(exportActionsRoutingModule).toBeTruthy();
    });
});
