import { Employee } from '../models/employee';

const baseCost = 1000; // Base cost per year
const dependentCost = 500; // Additional cost per dependent per year
const payPeriods = 26; // Bi-weekly pay periods

// Returns a tuple containing the cost [0] and discount [1]
function applyDiscount(firstName: string, isEmployee: boolean): [number, number] {
  const doesDiscountApply = firstName.toLocaleLowerCase().startsWith('a');
  if (doesDiscountApply) {
    if (isEmployee) { 
      return [baseCost * 0.9, baseCost * 0.1]; // 10% discount for employees with names starting with 'A'
    }
    else if (!isEmployee) {
      return [dependentCost * 0.9, dependentCost * 0.1]; // 10% discount for dependents with names starting with 'A'
    }    
  }

  return isEmployee ? [baseCost, 0.0] : [dependentCost, 0.0];
}

export function calculateTotalDiscounts(employee: Employee): number {
  let totalDiscount = 0.00;
  
  // Assuming the employee may no longer be w/company or not enrolled
  if (!employee.isActive || !employee.isEnrolled) {
    return 0.00;
  }

  totalDiscount += applyDiscount(employee.firstName, true)[1];
  
  // Add dependent discounts if any
  if (employee.dependents) {
    employee.dependents.forEach(dependent => {
      totalDiscount += applyDiscount(dependent.firstName, false)[1];
    });
  }
  
  return totalDiscount;
}

export function calculateCost(employee: Employee): number {
    if (!employee.isEnrolled) return 0;
    
    let totalCost = applyDiscount(employee.firstName, true)[0];
    
    // Add dependent costs if any
    employee.dependents?.map(dependent => {
      totalCost += applyDiscount(dependent.firstName, false)[0];
    });
    
    // Calculate per-paycheck cost
    return Number((totalCost / payPeriods).toFixed(2));
  }