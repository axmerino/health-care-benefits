import { Dependent } from '../models/dependent';
import { Employee } from '../models/employee';
import { mockEmployee } from '../constants/mock-data';

class EmployeeService {
    private employee: Employee = mockEmployee;

    // Assuming some level of authentication/caching/etc
    
    // REST API: GET - from https://{domain}/api/{version}/employee/{id}
    async getEmployee(): Promise<Employee> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.employee;
    }

    // REST API: PUT - https://{domain}/api/{version}/employee/{id}
    async updateEmployee(updatedEmployee: Employee): Promise<Employee> {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.employee = updatedEmployee;
        return this.employee;
    }

    // REST API: POST - https://{domain}/api/{version}/employee/{id}
    async addDependent(newDependent: Dependent): Promise<Employee> {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.employee.dependents = [...(this.employee.dependents || []), newDependent];
        return this.employee;
    }

    // REST API: DELETE - https://{domain}/api/{version}/employee/{id}
    async removeDependent(dependentId: string): Promise<Employee> {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.employee.dependents = this.employee.dependents?.filter(d => d.id !== dependentId) || [];
        return this.employee;
    }
}

export default EmployeeService;