import { FaEdit, FaRegTrashAlt, FaSave, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useEffect, useState } from "react";

import { Dependent } from '@/app/models/dependent';
import { Employee } from "@/app/models/employee";

interface DependentsListProps {
    employee: Employee;
    handleDelete: (id: string) => void;
    onUpdateDependents: (dependents: Dependent[]) => void;
    onUpdateTotalCost: (updatedEmployee: Employee) => void;
}

interface EditingState {
    [id: string]: {
        isEditingFirstName: boolean;
        isEditingLastName: boolean;
        firstName: string;
        lastName: string;
        isEnrolled: boolean;
    };
}

const DependentsList = ({ employee, handleDelete, onUpdateDependents, onUpdateTotalCost }: DependentsListProps) => {
    const [editingStates, setEditingStates] = useState<EditingState>({});

    // Initialize editing states when dependents load
    useEffect(() => {
        const initialStates: EditingState = {};
        employee.dependents?.forEach(dependent => {
            initialStates[dependent.id] = {
                isEditingFirstName: false,
                isEditingLastName: false,
                firstName: dependent.firstName,
                lastName: dependent.lastName,
                isEnrolled: dependent.isEnrolled
            };
        });
        setEditingStates(initialStates);
    }, [employee.dependents]);
        
    const handleEditFirstName = (e: React.MouseEvent<SVGElement>, dependent: Dependent) => {
        e.preventDefault();
        setEditingStates(prev => ({
            ...prev,
            [dependent.id]: {
                ...prev[dependent.id],
                isEditingFirstName: true,
                firstName: dependent.firstName
            }
        }));
    };

    const handleEditLastName = (e: React.MouseEvent<SVGElement>, dependent: Dependent) => {
        e.preventDefault();
        setEditingStates(prev => ({
            ...prev,
            [dependent.id]: {
                ...prev[dependent.id],
                isEditingLastName: true,
                lastName: dependent.lastName
            }
        }));
    };

    const handleSaveFirstName = (e: React.MouseEvent<SVGElement>, dependent: Dependent, index: number) => {
        // Suppresses default behavior and ensures we have an editing state for the corresponding dependent
        e.preventDefault();
        const state = editingStates[dependent.id];
        if (!state) return;

        const updatedDependent: Dependent = {
            ...dependent,
            firstName: state.firstName
        };

        const updatedDependents = [...(employee.dependents || [])];
        updatedDependents[index] = updatedDependent;
        onUpdateDependents(updatedDependents);

        setEditingStates(prev => ({
            ...prev,
            [dependent.id]: {
                ...prev[dependent.id],
                isEditingFirstName: false
            }
        }));
    };

    const [showAddForm, setShowAddForm] = useState(false);
    const [newDependent, setNewDependent] = useState<Partial<Dependent>>({
        firstName: '',
        lastName: '',
        isEnrolled: false
    });

    // Add form submit handler
    const handleAddDependent = () => {
        if (!newDependent.firstName || !newDependent.lastName) return;

        const dependent: Dependent = {
            id: crypto.randomUUID(),
            firstName: newDependent.firstName,
            lastName: newDependent.lastName,
            isEnrolled: newDependent.isEnrolled || false,
            isPrimary: false
        };

        const updatedDependents = [...(employee.dependents || []), dependent];
        onUpdateDependents(updatedDependents);
        
        // Reset form
        setNewDependent({ firstName: '', lastName: '', isEnrolled: false });
        setShowAddForm(false);
    };

    const handleSaveLastName = (e: React.MouseEvent<SVGElement>, dependent: Dependent, index: number) => {
        // Suppresses default behavior and ensures we have an editing state for the corresponding dependent
        e.preventDefault();
        const state = editingStates[dependent.id];
        if (!state) return;

        const updatedDependent: Dependent = {
            ...dependent,
            lastName: state.lastName
        };

        const updatedDependents = [...(employee.dependents || [])];
        updatedDependents[index] = updatedDependent;
        onUpdateDependents(updatedDependents);

        setEditingStates(prev => ({
            ...prev,
            [dependent.id]: {
                ...prev[dependent.id],
                isEditingLastName: false
            }
        }));
    };

    const toggleEnrollment = (e: React.MouseEvent<SVGElement>, dependent: Dependent, index: number) => {
        // Suppresses default behavior and ensures we have an editing state for the corresponding dependent
        e.preventDefault();
        
        // Get previous enrollment status
        const prevEnrollmentStatus = editingStates[dependent.id]?.isEnrolled ?? dependent.isEnrolled;                         
        const updatedDependent: Dependent = {
            ...dependent,
            isEnrolled: !prevEnrollmentStatus
        };

        const updatedDependents = [...(employee.dependents || [])];
        updatedDependents[index] = updatedDependent;
        
        onUpdateDependents(updatedDependents); 

        // Trigger cost recalculation by updating employee
        const updatedEmployee = {
            ...employee,
            dependents: updatedDependents
        };
        onUpdateTotalCost(updatedEmployee);
    };       
    
    return (
            <div className="dependent-info pt-6">                                
                {
                    employee.dependents?.length === 0 ? (
                     <span><label className="dependents-label">No dependents</label></span>
                    ) : 

                    <div className="w-full">
                        {/* Grid Container */}
                        <div className="grid grid-cols-[2fr_auto_2fr_auto_3fr_auto_auto] gap-4">
                            {/* Headers */}
                            <div className="contents">
                                <div className="font-bold pb-2 border-b">First Name</div>
                                <div className="w-10 border-b"></div>
                                <div className="font-bold pb-2 border-b">Last Name</div>
                                <div className="w-10 border-b"></div>
                                <div className="font-bold pb-2 border-b">Enrollment Status</div>
                                <div className="w-10 border-b"></div>
                                <div className="w-10 border-b"></div>
                            </div>
                        </div>                   
        
                        {
                            employee.dependents?.map((dependent, index) => (                                
                                <div key={dependent.id} className="grid grid-cols-[2fr_auto_2fr_auto_3fr_auto_auto] gap-4 items-center py-2">
                                    <div id="first-name-column" className="whitespace-nowrap">
                                    {editingStates[dependent.id]?.isEditingFirstName ? (
                                        <input
                                            className="pl-2 border rounded"
                                            value={editingStates[dependent.id]?.firstName || dependent.firstName}
                                            onChange={(e) => setEditingStates(prev => ({
                                                ...prev,
                                                [dependent.id]: {
                                                    ...prev[dependent.id],
                                                    firstName: e.target.value
                                                }
                                            }))}
                                        />
                                    ) : (
                                        <span>{dependent.firstName}</span>
                                    )}
                                    </div>
                                    <div id="first-name-actions-column"className="whitespace-nowrap">
                                        {editingStates[dependent.id]?.isEditingFirstName ? (
                                            <FaSave 
                                                className="cursor-pointer hover:text-green-600"
                                                onClick={(e) => handleSaveFirstName(e, dependent, index)}
                                            />
                                        ) : (
                                            <FaEdit 
                                                className="cursor-pointer hover:text-blue-600"
                                                onClick={(e) => handleEditFirstName(e, dependent)}
                                            />
                                        )}
                                    </div>
                                    <div id="last-name-column" className="whitespace-nowrap">
                                    {editingStates[dependent.id]?.isEditingLastName ? (
                                        <input
                                            className="pl-2 border rounded"
                                            value={editingStates[dependent.id]?.lastName || dependent.lastName}
                                            onChange={(e) => setEditingStates(prev => ({
                                                ...prev,
                                                [dependent.id]: {
                                                    ...prev[dependent.id],
                                                    lastName: e.target.value
                                                }
                                            }))}
                                        />
                                    ) : (
                                        <span>{dependent.lastName}</span>
                                    )}
                                    </div>
                                    <div id="last-name-actions-column" className="whitespace-nowrap">
                                        {editingStates[dependent.id]?.isEditingLastName ? (
                                            <FaSave 
                                                className="cursor-pointer hover:text-green-600"
                                                onClick={(e) => handleSaveLastName(e, dependent, index)}
                                            />
                                        ) : (
                                            <FaEdit 
                                                className="cursor-pointer hover:text-blue-600"
                                                onClick={(e) => handleEditLastName(e, dependent)}
                                            />
                                        )}
                                    </div>
                                    <div id="enrollment-status-column" className="whitespace-nowrap">
                                        {dependent.isEnrolled  ? 
                                            <span className="enrollment-status enrolled">
                                                <div className="active">●</div> Currently enrolled
                                            </span> : 
                                            <span className="enrollment-status not-enrolled">
                                                <div className="not-active">●</div> Not enrolled
                                            </span>
                                        }
                                    </div>
                                    <div id="enrollment-status-actions-column" className="whitespace-nowrap">
                                        {editingStates[dependent.id]?.isEnrolled  ? 
                                        <FaToggleOn 
                                            className="cursor-pointer hover:text-blue-600"
                                            onClick={(e) => {                                                
                                                toggleEnrollment(e, dependent, index)
                                            }}
                                        /> : 
                                        <FaToggleOff 
                                            className="cursor-pointer hover:text-blue-600"
                                            onClick={(e) => {
                                                toggleEnrollment(e, dependent, index)
                                            }} 
                                        /> }
                                    </div>
                                    <div id="delete-dependent-column" className="edit-icons flex justify-end gap-4">
                                        <FaRegTrashAlt 
                                            className="cursor-pointer hover:text-red-600"
                                            onClick={() => handleDelete(dependent.id)}
                                        />
                                    </div>
                                </div>
                                
                            ))}
                    </div>
                }
                
                <div className="add-dependent pt-4">
                    {!showAddForm ? (
                        <div className="flex justify-end">
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Dependent
                            </button>
                        </div>
                    ) : (
                    <div className="grid grid-cols-[2fr_auto_2fr_auto_3fr_auto_auto] gap-4 items-center py-2 border-t">
                        <input
                            className="pl-2 border rounded"
                            placeholder="First Name"
                            value={newDependent.firstName}
                            onChange={(e) => setNewDependent(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                        <div className="w-10" />
                        <input
                            className="pl-2 border rounded"
                            placeholder="Last Name"
                            value={newDependent.lastName}
                            onChange={(e) => setNewDependent(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                        <div className="w-10" />
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={newDependent.isEnrolled}
                                onChange={(e) => setNewDependent(prev => ({ ...prev, isEnrolled: e.target.checked }))}
                            />
                            <span>Enrolled</span>
                        </div>
                        <div className="w-10" />
                        <div className="flex gap-2">
                            <button 
                                onClick={handleAddDependent}
                                className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white px-2 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    };
    
export default DependentsList