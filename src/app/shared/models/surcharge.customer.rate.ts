export interface SurchargeCustomerRate {
    rates: [{
        id: number,
        surchargecustomer_id: number;
        year: number,
        dailyrate: number,
    }];
}
