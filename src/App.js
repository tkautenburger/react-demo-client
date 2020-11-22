import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {FaUserAlt, FaBuilding } from "react-icons/fa"

import DepartmentForm from './components/departmentForm'
import EmployeeForm from './components/employeeForm'

import {employees, departments} from './data.json'

function App() {
  return (
    <Router>
      <div >
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/employees" className="btn btn-header">
                  <FaUserAlt />
                  <span>Employees</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="btn btn-header">
                  <FaBuilding />
                  <span>Departments</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/departments">
            <DepartmentForm department={departments[0]} />
          </Route>
          <Route path="/employees">
            <EmployeeForm employee={employees[1]} />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
