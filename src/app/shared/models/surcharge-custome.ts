import { SurchargeCustomerRate } from './surcharge-customer-rate';
export interface SurchargeCustomer {
    id: number;
    debitorNumber: number;
    debitorName: string;
    type: string;
    customerNumber: number;
    customerName: string;
    rates: [SurchargeCustomerRate];
}
