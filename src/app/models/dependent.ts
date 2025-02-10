import { Beneficiary } from './beneficiary';

export interface Dependent extends Beneficiary {
    id: string;
    firstName: string;
    lastName: string;
    isEnrolled: boolean;    
}