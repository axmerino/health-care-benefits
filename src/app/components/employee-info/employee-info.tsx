import { FaEdit, FaSave } from "react-icons/fa";

import { Dependent } from "@/app/models/dependent";
import DependentsList from "../dependents-list/dependents-list";
import { Employee } from "@/app/models/employee";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useState } from "react";

interface EmployeeInfoProps {
    employee: Employee;
    onUpdateEmployee: (updatedEmployee: Employee) => void;
    onUpdateTotalCost: (updatedEmployee: Employee) => void;
}


const EmployeeInfo = ({ employee, onUpdateEmployee, onUpdateTotalCost }: EmployeeInfoProps) => {
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState(employee.isEnrolled);
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);

    const handleEditFirstName = () => {
        setIsEditingFirstName(true);
    };

    const handleEditLastName = () => {
        setIsEditingLastName(true);
    };

    const toggleEnrollment = () => {
        const updatedEnrollmentStatus = !enrollmentStatus;
        setEnrollmentStatus(updatedEnrollmentStatus);
        const updatedEmployee = {
            ...employee,
            isEnrolled: updatedEnrollmentStatus
        };
        onUpdateTotalCost(updatedEmployee);
    };

    const handleDelete = (id: string) => {
        if (!employee.dependents) {
            return;
        }

        const dependents = employee.dependents!.filter((dep) => dep.id !== id);
        handleSave(dependents);
      }
    

    const handleSave = (dependents: Dependent[]) => {
        onUpdateEmployee({
            ...employee,
            firstName: firstName,
            lastName: lastName,
            isEnrolled: enrollmentStatus,
            dependents: dependents
        });
        setIsEditingFirstName(false);
        setIsEditingLastName(false);
    };
        
    return (
        <div>
            <div className="employee-info rounded-xl mb-4 p-4">
                <div className="flex flex-row pb-2">
                    <div className="shrink">                        
                        <label id="employee-name-label" className="employee-info-label">First Name:</label> 
                    </div>
                    <div className="flex-none">
                        {isEditingFirstName ? (
                            <div className="flex gap-2">
                                <input
                                    className="pl-2 border rounded"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        ) : (
                            <input
                                className="pl-2"
                                readOnly
                                type="text"
                                value={employee.firstName}
                            />
                        )}
                    </div>
                    <div className="flex-none pl-4">
                    {isEditingFirstName ? (
                            <FaSave 
                                className="cursor-pointer hover:text-green-600"
                                onClick={() => handleSave(employee.dependents || [])}
                            />
                        ) : (
                            <FaEdit 
                                className="cursor-pointer hover:text-blue-600"
                                onClick={handleEditFirstName}
                            />
                        )}                
                    </div>
                </div>
                <div className="flex flex-row pb-2">
                    <div className="shrink">                        
                        <label id="employee-last-name-label" className="employee-info-label">Last Name:</label> 
                    </div>
                    <div className="flex-none">
                    {isEditingLastName ? (
                        <div className="flex gap-2">
                            <input
                                className="pl-2 border rounded"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    ) : (
                        <input
                            className="pl-2"
                            readOnly
                            type="text"
                            value={employee.lastName}
                        />
                    )}
                    </div>
                    <div className="flex-none pl-4">
                    {isEditingLastName ? (
                            <FaSave 
                                className="cursor-pointer hover:text-green-600"
                                onClick={() => handleSave(employee.dependents || [])}
                            />
                        ) : (
                            <FaEdit 
                                className="cursor-pointer hover:text-blue-600"
                                onClick={handleEditLastName}
                            />
                        )}                
                    </div>
                </div>
                <div className="flex flex-row pb-2"> 
                    <div className="pr-2">
                        <label id="employee-status-label" className="employee-info--label">Status:</label>
                    </div>               
                    <div className="pr-2">
                        {enrollmentStatus ? <span className="enrollment-status enrolled"><div className="active">●</div> Currently enrolled</span> : <span className="enrollment-status not-enrolled"><div className="not-active">●</div> Not enrolled</span>}
                    </div>
                    <div className="flex-none">
                        {enrollmentStatus? 
                        <FaToggleOn 
                            className="cursor-pointer hover:text-blue-600"
                            onClick={toggleEnrollment}
                        /> : 
                        <FaToggleOff 
                            className="cursor-pointer hover:text-blue-600"
                            onClick={toggleEnrollment}
                        /> }
                    </div>
                </div>
                
                <section className="pt-8">
                
                <div className="flex flex-row">
                    <FaUserGroup className="object-fill" />
                    <label className="pl-2">Dependents</label>                
                </div>
                
                <DependentsList 
                    employee={employee}
                    handleDelete={handleDelete}
                    onUpdateDependents={(dependents: Dependent[]) => handleSave(dependents)}
                    onUpdateTotalCost={onUpdateTotalCost}
                />
                </section>
            </div>
      </div>
    );
}

export default EmployeeInfo