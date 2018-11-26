import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ExportActionsComponent} from './export-actions.component';

const exportActionRoutes: Routes = [
    { path: '', component: ExportActionsComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(exportActionRoutes)
    ],
    exports: [RouterModule]
})
export class ExportActionsRoutingModule {}
export const exportActionsRoutingComponents = [ExportActionsComponent];
