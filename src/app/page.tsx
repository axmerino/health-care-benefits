'use client'

import { useEffect, useMemo, useState } from 'react';

import Calculator from './components/calculator/calculator';
import { Employee } from './models/employee';
import EmployeeInfo from './components/employee-info/employee-info';
import EmployeeService from '@/api/services/employee-service';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import SaveChanges from './components/save-changes/save-changes';

export default function Home() {

  // A default employee to use in case the API call fails
  const defaultEmployee: Employee = {
    id: "1",
    isActive: true,
    isEnrolled: true,
    isPrimary: true,
    firstName: "Reed",
    lastName: "Richards",
    startDate: new Date(),
    dependents: [],
  };

  // Api service configuration - memo-ization used to avoid re-creating the service on every render
  const employeeService = useMemo(() => new EmployeeService(), []);
  const [employee, setEmployee] = useState<Employee>(defaultEmployee);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleEmployeeUpdate = (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee);
    localStorage.setItem(updatedEmployee.id, JSON.stringify(updatedEmployee));
  };

  // Combined useEffect for data loading (first will try local storage, then fall back to API)
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        setIsLoading(true);
        // Try localStorage first
        const savedEmployee = localStorage.getItem('1');
        if (savedEmployee) {
          const parsed = JSON.parse(savedEmployee);
          setEmployee({
            ...parsed,
            startDate: new Date(parsed.startDate)
          });
          return;
        }

        // Fall back to API
        const data = await employeeService.getEmployee();
        setEmployee(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to load employee'));
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployeeData();
  }, [employeeService]); // Include employeeService in dependencies

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="min-h-screen flex flex-col relative pb-16">
      <main className="container max-w-full mx-auto">
        <Header />
        
        <EmployeeInfo 
          employee={employee} 
          onUpdateEmployee={handleEmployeeUpdate} 
          onUpdateTotalCost={handleEmployeeUpdate}
        />        
        <Calculator 
          employee={employee}
        />
        <SaveChanges 
          employee={employee} 
          onSave={handleEmployeeUpdate}
        />        
        <Footer />
      </main>
    </div>
  );
}
