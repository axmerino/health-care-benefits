import { Employee } from '../../models/employee';

// TODO: Revisit this to see if we really need to define a separate interface and can't inline define the types
interface SaveChangesProps {
    employee: Employee;
    onSave: (employee: Employee) => void;
  }
  
  const SaveChanges = ({ employee, onSave }: SaveChangesProps) => {  
    return(
        <div className="pt-4 pr-4 mb-20 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onSave(employee)}>Save Changes</button>
        </div>
    )
}

export default SaveChanges