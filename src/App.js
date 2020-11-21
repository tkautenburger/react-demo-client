import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import DepartmentForm from './components/departmentForm';
import EmployeeForm from './components/employeeForm';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/employees" >
                  <span>Employees</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" >
                  <span>Departments</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/departments">
            <DepartmentForm department={{ deptId: 4711, deptName: 'HR', deptDescription: 'Human Resources' }} />
          </Route>
          <Route path="/employees">
            <EmployeeForm employee={{ empId: 101, lastName: 'Kautenburger', firstName: 'Thomas', deptId: 0 }} />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
