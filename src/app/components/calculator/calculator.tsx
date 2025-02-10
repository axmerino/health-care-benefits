import { calculateCost, calculateTotalDiscounts } from "@/app/utils/calculateCost"

import { Employee } from "@/app/models/employee"

interface CalculatorProps {
    employee: Employee;
}
  
const Calculator = ({ employee }: CalculatorProps) => {
    const basePayPerPaycheck = 2000.00;
    const baseCost = 1000; // Base cost per year
    const dependentCost: number = 500; // Additional cost per dependent per year
    const numberOfDependents  = employee.dependents?.filter(dependent => dependent.isEnrolled).length || 0;
    const totalDiscount = calculateTotalDiscounts(employee);
    const totalCost = calculateCost(employee);
    const payPeriods = 26; // Bi-weekly pay periods
    const basePayPerPaycheckAfterDeductions = (basePayPerPaycheck / payPeriods - totalCost);

    return(

    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 pl-4 pr-4">Cost Breakdown (per paycheck/period)</h2>
        <div className="grid grid-cols-2 gap-2 text-lg">

            <div>Base Pay Per Paycheck</div>
                <div className="text-right">${(basePayPerPaycheck / payPeriods).toFixed(2)}</div>

                    {/* Base Cost */}
                    <div>Base Cost ($1000/yr)</div>
                    <div className="text-right text-red-600">-${ employee.isActive && employee.isEnrolled ? (baseCost / payPeriods).toFixed(2) : (0.00).toFixed(2)}</div>
                
                    {/* Dependent Costs */}
                    {numberOfDependents > 0 && (
                        <>
                            <div>Dependent Cost (${dependentCost.toFixed(2)}/yr * {numberOfDependents})</div>
                            <div className="text-right text-red-600">
                                -${ employee.isActive && !employee.isEnrolled || employee.dependents?.length == 0 ? 0.00.toFixed(2) : 
                                (dependentCost * numberOfDependents / payPeriods).toFixed(2)}
                            </div>
                        </>
                    )}
            
                    {/* Enrollment Deduction */}
                    {employee.isEnrolled && totalDiscount > 0 && (
                        <>
                            <div>Enrollment Discount</div>
                            <div className="text-right text-red-600">-${calculateTotalDiscounts(employee).toFixed(2)}</div>
                        </>
                    )}  
            
                    {/* Divider */}
                    <div className="col-span-2 border-t border-gray-300 my-2"></div>
                    
                    {/* Total */}
                    <div className="font-bold">Total Cost</div>
                    <div className="text-right font-bold">${calculateCost(employee)}</div>

                    <div className="font-bold">Pay After Deductions</div>
                    <div className={`text-right font-bold ${basePayPerPaycheckAfterDeductions < 0 ? 'text-red-600' : 'text-black'}`}>${basePayPerPaycheckAfterDeductions.toFixed(2)}</div>
                </div>
            </div>
    )
}

export default Calculator