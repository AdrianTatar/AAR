import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { NgModule } from '@angular/core';
import { SurchargeCustomersRateService } from '../surchargecustomersrates/services/surcharge-customers-rates.service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        SurchargeCustomersService,
        SurchargeCustomersRateService
    ]
})
export class ScAddModule { }
