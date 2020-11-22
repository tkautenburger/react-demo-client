import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DepartmentForm from './components/departmentForm'
import EmployeeForm from './components/employeeForm'

import {employees, departments} from './data.json'

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
