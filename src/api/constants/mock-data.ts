import { Employee } from '../models/employee';

export const mockEmployee: Employee = {
    id: "1",
    isActive: true,
    isEnrolled: true,
    isPrimary: true,
    firstName: "Reed",
    lastName: "Richards",
    startDate: new Date(),
    dependents: [
        { 
            id: "2",
            isEnrolled: true,
            isPrimary: false,
            firstName: "Susan",
            lastName: "Storm",
        },
        { 
            id: "3",
            isEnrolled: true,
            isPrimary: false,
            firstName: "Johnny",
            lastName: "Storm",
        },
        {
            id: "4",
            isEnrolled: false,
            isPrimary: false,
            firstName: "Ben",
            lastName: "Grimm",
        }
    ]
};