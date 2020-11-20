import './App.css';
import DepartmentForm from './components/departmentForm';
import EmployeeForm from './components/employeeForm';


function App() {
  return (
    <div className="app">
      <DepartmentForm department={{ deptId: 4711, deptName: 'HR', deptDescription: 'Human Resources' }} />
      <p /><p />
      <EmployeeForm employee={{ empId: 101, lastName: 'Kautenburger', firstName: 'Thomas', deptId: 0 }} />
    </div>
  );
}

export default App;
