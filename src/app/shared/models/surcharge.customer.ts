import { SurchargeCustomerRate } from './surcharge.customer.rate';
export interface SurchargeCustomer {
    id: number;
    debitornumber: number;
    debitorname: string;
    type: string;
    customernumber: number;
    customername: string;
    rates: [SurchargeCustomerRate];
}
