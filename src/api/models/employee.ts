import { Dependent } from './dependent';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEnrolled: boolean;
  isPrimary: boolean;
  startDate: Date;
  dependents?: Dependent[];
}