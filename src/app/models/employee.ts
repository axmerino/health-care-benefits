import { Beneficiary } from './beneficiary';
import { Dependent } from './dependent';

export interface Employee extends Beneficiary {
  startDate: Date
  isActive: boolean
  dependents?: Array<Dependent>; // Define proper dependent type as needed
}

