import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FaUserAlt, FaBuilding } from "react-icons/fa"

import DepartmentPage from './components/department/DepartmentPage'
import EmployeePage from './components/employee/EmployeePage'

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
            <DepartmentPage />
          </Route>
          <Route path="/employees">
            <EmployeePage />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
